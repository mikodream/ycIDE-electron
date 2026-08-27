/**
 * macOS 平台代码生成器
 * 
 * 将 ycIDE 项目转译为 macOS 原生 Cocoa/ObjC 代码
 */

import { join } from 'path';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { createHash } from 'crypto';
import type { ProjectInfo, WindowFileInfo } from './compiler';
import { generateAllControlsCode } from './macos-control-mapping';

export interface MacosCompileOptions {
  project: ProjectInfo;
  tempDir: string;
  editorFiles?: Map<string, string>;
  debug?: boolean;
  windowInfo?: WindowFileInfo;
}

/**
 * 生成 macOS 主程序代码
 */
export function generateMacosMainCode(options: MacosCompileOptions): { mainPath: string; additionalFiles: string[] } {
  const { project, tempDir, editorFiles = new Map(), windowInfo } = options;
  const additionalFiles: string[] = [];
  const width = windowInfo?.width || 592;
  const height = windowInfo?.height || 384;
  const title = windowInfo?.title || project.projectName;
  const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  let mainCode = '/* 由 ycIDE 自动生成 (macOS) */\n';
  mainCode += `/* 项目名称: ${project.projectName} */\n\n`;
  mainCode += '#import <Cocoa/Cocoa.h>\n';
  mainCode += '#import <objc/runtime.h>\n';
  mainCode += '#include <cstdio>\n';
  mainCode += '#include <cstring>\n';
  mainCode += '#include <cwchar>\n';
  mainCode += '#include <cwchar>\n';
  mainCode += '#include <string>\n';
  mainCode += '#include <unordered_map>\n';
  mainCode += '#include <unordered_set>\n';
  mainCode += 'typedef NSView YCControl;\n\n';

  mainCode += `
// YC_TEXT 兼容层
struct YC_TEXT {
    std::wstring s;
    YC_TEXT() = default;
    YC_TEXT(const wchar_t* p) : s(p ? p : L"") {}
    YC_TEXT(const std::wstring& p) : s(p) {}
    operator const wchar_t*() const { return s.c_str(); }
    const wchar_t* c_str() const { return s.c_str(); }
    bool empty() const { return s.empty(); }
};

`;

  // 窗口类定义
  mainCode += generateWindowClass();

  // 控件管理类
  mainCode += generateControlManager();

  // 主窗口实现
  mainCode += generateMainWindowImplementation(project, windowInfo);

  // main 函数
  mainCode += generateMainFunction(project, { width, height, title: escapedTitle, visible: windowInfo?.visible !== false, disabled: windowInfo?.disabled === true });

  const mainPath = join(tempDir, 'main.mm');
  writeFileSync(mainPath, mainCode, 'utf-8');

  // 转译 .eyc 文件（暂返回空数组，完整转译待实现）
  return { mainPath, additionalFiles };
}

function generateTextLayer(): string {
  return `
// YC_TEXT 兼容层：内部使用 NSString，对外提供 wchar_t* ABI
struct YC_TEXT {
    NSString* s;
    YC_TEXT() : s(@\"\") {}
    YC_TEXT(const wchar_t* p) {
        if (p) {
            @autoreleasepool {
                NSUInteger len = wcslen(p);
                s = [NSString stringWithCharacters:(const unichar*)p length:len];
            }
        } else {
            s = @\"\";
        }
    }
    YC_TEXT(const std::string& utf8) : s([NSString stringWithUTF8String:utf8.c_str()]) {}
    operator const wchar_t*() const {
        @autoreleasepool {
            return (const wchar_t *)[s UTF16String];
        }
    }
    const wchar_t* c_str() const {
        @autoreleasepool {
            return (const wchar_t *)[s UTF16String];
        }
    }
    bool empty() const { return [s length] == 0; }
    std::string utf8() const {
        @autoreleasepool {
            const char* c = [s UTF8String];
            return c ? std::string(c) : "";
        }
    }
};
`;
}

function generateWindowClass(): string {
  return `
// 主窗口类
@interface YCMainWindow : NSWindow <NSWindowDelegate>
@property (nonatomic, strong) NSString* formName;
@property (nonatomic, strong) NSMutableDictionary<NSString*, YCControl*>* controls;
@property (nonatomic, assign) int ctrlIdCounter;
@end

@implementation YCMainWindow

- (instancetype)initWithProject:(NSString*)name width:(int)w height:(int)h {
  if (self = [super initWithContentRect:NSMakeRect(0, 0, w, h)
                            styleMask:NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskResizable
                              backing:NSBackingStoreBuffered
                                defer:NO]) {
    [self setTitle:name];
    [self center];
    _formName = name;
    _controls = [NSMutableDictionary dictionary];
    _ctrlIdCounter = 1001;
  }
  return self;
}

- (void)windowWillClose:(NSNotification*)notification {
  NSApplication* app = [NSApplication sharedApplication];
  [app terminate:nil];
}

- (void)addControl:(YCControl*)control name:(NSString*)name {
  [_controls setObject:control forKey:name];
}

- (YCControl*)controlByName:(NSString*)name {
  return [_controls objectForKey:name];
}

- (int)nextCtrlId {
  return _ctrlIdCounter++;
}

@end
`;
}

function generateControlManager(): string {
  return `
// 控件管理器
@interface YCControlManager : NSObject
+ (instancetype)sharedInstance;
- (void)registerControl:(YCControl*)control name:(NSString*)name window:(YCMainWindow*)win;
- (YCControl*)controlByName:(NSString*)name;
@end

static NSMutableDictionary* g_ycControls;

@implementation YCControlManager

+ (instancetype)sharedInstance {
  static YCControlManager* instance;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [[self alloc] init];
    g_ycControls = [NSMutableDictionary dictionary];
  });
  return instance;
}

- (void)registerControl:(YCControl*)control name:(NSString*)name window:(YCMainWindow*)win {
  [g_ycControls setObject:@{
    @"control": control,
    @"window": win,
    @"name": name
  } forKey:name];
}

- (YCControl*)controlByName:(NSString*)name {
  NSDictionary* info = [g_ycControls objectForKey:name];
  return info[@"control"];
}

@end
`;
}

function generateMainWindowImplementation(project: ProjectInfo, windowInfo?: WindowFileInfo): string {
  let implCode = '';
  
  // 如果有窗口信息，生成控件创建代码
  if (windowInfo && windowInfo.controls) {
    implCode += '// 控件创建代码\n';
    implCode += generateAllControlsCode(windowInfo.controls, 'window', windowInfo.height);
    implCode += '\n';
  }
  
  return `
// 主窗口实现
static void CreateMainWindow(YCMainWindow* window) {
  ${implCode}
}
`;
}

function generateMainFunction(project: ProjectInfo, window: { width: number; height: number; title: string; visible: boolean; disabled: boolean }): string {
  return `
int main(int argc, char* argv[]) {
  @autoreleasepool {
    NSApplication* app = [NSApplication sharedApplication];
    [app setActivationPolicy:NSApplicationActivationPolicyRegular];
    
    // 创建主窗口
    YCMainWindow* mainWindow = [[YCMainWindow alloc] 
    initWithProject:[NSString stringWithUTF8String:"${window.title}"]
              width:${window.width}
             height:${window.height}];
    
    // 创建控件
    CreateMainWindow(mainWindow);
    
    // 显示窗口
    [mainWindow makeKeyAndOrderFront:nil];
    [NSApp activateIgnoringOtherApps:YES];
    
    // 运行事件循环
    [app run];
  }
  return 0;
}
`;
}

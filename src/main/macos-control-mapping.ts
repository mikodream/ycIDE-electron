/**
 * macOS 控件映射器
 *
 * 将 Windows 控件创建代码映射到 macOS Cocoa 控件
 */

import type { WindowControlInfo } from './compiler';

export interface MacosControlMapping {
  /** 易语言控件类型 */
  eycType: string;
  /** Cocoa 控件类名 */
  cocoaClass: string;
  /** Cocoa 控件初始化代码 */
  initCode: string;
  /** 控件属性映射 */
  propMap?: Record<string, string>;
  /** 事件映射 */
  eventMap?: Record<string, string>;
}

/**
 * 控件映射表
 */
export const MACOS_CONTROL_MAPPINGS: MacosControlMapping[] = [
  {
    eycType: '按钮',
    cocoaClass: 'NSButton',
    initCode: `[NSButton buttonWithTitle:@"" target:nil action:nil]`,
    propMap: {
      '标题': 'setTitle:',
      '可见': 'setHidden:',
      '禁用': 'setEnabled:',
    },
    eventMap: {
      '被单击': 'setTarget:action:',
    },
  },
  {
    eycType: '标签',
    cocoaClass: 'NSTextField',
    initCode: `[[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '标题': 'setStringValue:',
      '可见': 'setHidden:',
      '文本颜色': 'setTextColor:',
      '背景颜色': 'setBackgroundColor:',
      '字体': 'setFont:',
    },
  },
  {
    eycType: '编辑框',
    cocoaClass: 'NSTextField',
    initCode: `[[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '标题': 'setStringValue:',
      '可见': 'setHidden:',
      '只读': 'setEditable:',
      '密码': 'setEchoCharacter:',
    },
  },
  {
    eycType: '列表框',
    cocoaClass: 'NSCollectionView',
    initCode: `[[NSCollectionView alloc] initWithFrame:NSMakeRect(0, 0, 200, 150)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '组合框',
    cocoaClass: 'NSComboBox',
    initCode: `[[NSComboBox alloc] initWithFrame:NSMakeRect(0, 0, 200, 25)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '选择框',
    cocoaClass: 'NSButton',
    initCode: `[[NSButton buttonWithType:NSButtonSwitchType] retain]`,
    propMap: {
      '标题': 'setTitle:',
      '选中': 'setState:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '单选框',
    cocoaClass: 'NSButton',
    initCode: `[[NSButton buttonWithType:NSButtonRadioType] retain]`,
    propMap: {
      '标题': 'setTitle:',
      '选中': 'setState:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '进度条',
    cocoaClass: 'NSProgressIndicator',
    initCode: `[[NSProgressIndicator alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '最小值': 'setMinValue:',
      '最大值': 'setMaxValue:',
      '当前值': 'setDoubleValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '滑块条',
    cocoaClass: 'NSSlider',
    initCode: `[[NSSlider alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '最小值': 'setMinValue:',
      '最大值': 'setMaxValue:',
      '当前值': 'setDoubleValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '画板',
    cocoaClass: 'NSView',
    initCode: `[[NSView alloc] initWithFrame:NSMakeRect(0, 0, 200, 200)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '图片框',
    cocoaClass: 'NSImageView',
    initCode: `[[NSImageView alloc] initWithFrame:NSMakeRect(0, 0, 100, 100)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '日期框',
    cocoaClass: 'NSDatePicker',
    initCode: `[[NSDatePicker alloc] initWithFrame:NSMakeRect(0, 0, 150, 25)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '月历',
    cocoaClass: 'NSCalendarView',
    initCode: `[[NSCalendarView alloc] initWithFrame:NSMakeRect(0, 0, 300, 200)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '选择夹',
    cocoaClass: 'NSTabView',
    initCode: `[[NSTabView alloc] initWithFrame:NSMakeRect(0, 0, 400, 300)]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '树形框',
    cocoaClass: 'NSTreeController',
    initCode: `[[NSTreeController alloc] init]`,
    propMap: {
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '图形按钮',
    cocoaClass: 'NSButton',
    initCode: `[[NSButton buttonWithFrame:NSMakeRect(0, 0, 50, 50)] retain]`,
    propMap: {
      '图片': 'setImage:',
      '选中': 'setState:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '超级链接框',
    cocoaClass: 'NSTextField',
    initCode: `[[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '标题': 'setStringValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '调节器',
    cocoaClass: 'NSStepper',
    initCode: `[[NSStepper alloc] initWithFrame:NSMakeRect(0, 0, 50, 25)]`,
    propMap: {
      '最小值': 'setMinValue:',
      '最大值': 'setMaxValue:',
      '步长': 'setIncrement:',
      '当前值': 'setDoubleValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '横向滚动条',
    cocoaClass: 'NSSlider',
    initCode: `[[NSSlider alloc] initWithFrame:NSMakeRect(0, 0, 100, 20)]`,
    propMap: {
      '最小值': 'setMinValue:',
      '最大值': 'setMaxValue:',
      '当前值': 'setDoubleValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '纵向滚动条',
    cocoaClass: 'NSSlider',
    initCode: `[[NSSlider alloc] initWithFrame:NSMakeRect(0, 0, 20, 100)]`,
    propMap: {
      '最小值': 'setMinValue:',
      '最大值': 'setMaxValue:',
      '当前值': 'setDoubleValue:',
      '可见': 'setHidden:',
    },
  },
  {
    eycType: '分组框',
    cocoaClass: 'NSBox',
    initCode: `[[NSBox alloc] initWithFrame:NSMakeRect(0, 0, 200, 150)]`,
    propMap: {
      '标题': 'setTitle:',
      '可见': 'setHidden:',
    },
  },
];

/**
 * 根据控件类型获取映射
 */
export function getControlMapping(eycType: string): MacosControlMapping | null {
  return MACOS_CONTROL_MAPPINGS.find(m =>
    m.eycType.toLowerCase() === eycType.toLowerCase()
  ) || null;
}

/**
 * 生成控件创建代码
 */
export function generateControlCode(
  ctrl: WindowControlInfo,
  parentId: string,
  ctrlId: number
): string {
  const mapping = getControlMapping(ctrl.type);
  if (!mapping) {
    return `    // TODO: 未实现的控件类型 ${ctrl.type}\n`;
  }

  let code = '';

  // 生成控件创建代码
  const varName = `yc_ctrl_${ctrl.name}`;
  code += `    NSView* ${varName} = ${mapping.initCode};\n`;

  // 设置位置
  const x = ctrl.x || 0;
  const y = ctrl.y || 0;
  const w = ctrl.width || 100;
  const h = ctrl.height || 20;
  code += `    [${varName} setFrame:NSMakeRect(${x}, ${y}, ${w}, ${h})];\n`;

  // 设置属性
  if (mapping.propMap) {
    for (const [eycProp, objcMethod] of Object.entries(mapping.propMap)) {
      const value = ctrl.extraProps?.[eycProp];
      if (value === undefined) continue;

      if (eycProp === '标题' && typeof value === 'string') {
        code += `    [${varName} ${objcMethod}:[NSString stringWithUTF8String:"${value.replace(/"/g, '\\"')}"]];\n`;
      } else if (eycProp === '可见') {
        code += `    [${varName} setHidden:${!value}];\n`;
      } else if (eycProp === '禁用') {
        code += `    [${varName} setEnabled:${!value}];\n`;
      } else if (eycProp === '选中') {
        code += `    [${varName} setState:${value ? 1 : 0}];\n`;
      } else if (typeof value === 'number') {
        code += `    [${varName} ${objcMethod}:${value}];\n`;
      }
    }
  }

  // 添加到父窗口的 contentView（NSWindow 本身没有 addSubview:）
  code += `    [[${parentId} contentView] addSubview:${varName}];\n`;

  // 注册控件
  code += `    [window addControl:${varName} name:@"${ctrl.name}"];\n`;

  return code;
}

/**
 * 生成完整的控件创建代码
 */
export function generateAllControlsCode(
  controls: WindowControlInfo[],
  windowName: string
): string {
  let code = '';
  let ctrlId = 1001;

  for (const ctrl of controls) {
    code += generateControlCode(ctrl, 'window', ctrlId++);
  }

  return code;
}

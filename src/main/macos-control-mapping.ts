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
  ctrlId: number,
  windowHeight = 384
): string {
  const mapping = getControlMapping(ctrl.type);
  if (!mapping) return `    // TODO: 未实现的控件类型 ${ctrl.type}\n`;

  const varName = `yc_ctrl_${ctrl.name}`;
  const title = typeof ctrl.extraProps?.['标题'] === 'string'
    ? String(ctrl.extraProps['标题'])
    : (ctrl.text || '');
  const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const x = Number.isFinite(ctrl.x) ? ctrl.x : 0;
  const y = Number.isFinite(ctrl.y) ? ctrl.y : 0;
  const w = Number.isFinite(ctrl.width) && ctrl.width > 0 ? ctrl.width : 100;
  const h = Number.isFinite(ctrl.height) && ctrl.height > 0 ? ctrl.height : 20;
  // NSWindow 的 contentRect 以左上角为原点（y 向上），而易语言坐标以左上角为原点（y 向下）。
  // 需要将易语言的 (x, y) 翻转成 Cocoa 坐标：flippedY = windowH - y - h。
  const flippedY = Math.max(0, windowHeight - y - h);
  const ctrlVar = ctrl.type === '标签' || ctrl.type === 'Label'
    ? 'NSTextField*'
    : ctrl.type === '画板' || ctrl.type === 'DrawPanel'
      ? 'NSView*'
      : ctrl.type === '图片框' || ctrl.type === 'PictureBox'
        ? 'NSImageView*'
        : 'NSButton*';
  const initCode = ctrl.type === '按钮' || ctrl.type === 'Button'
    ? `[[NSButton alloc] initWithFrame:NSMakeRect(${x}, ${flippedY}, ${w}, ${h})]`
    : mapping.initCode;

  let code = `    ${ctrlVar} ${varName} = ${initCode};\n`;
  if (title && (ctrl.type === '按钮' || ctrl.type === 'Button')) {
    code += `    [${varName} setTitle:@"${escapedTitle}"];\n`;
  }
  for (const [eycProp, objcMethod] of Object.entries(mapping.propMap || {})) {
    const value = ctrl.extraProps?.[eycProp];
    if (value === undefined || eycProp === '标题') continue;
    if (eycProp === '可见') code += `    [${varName} setHidden:${!value}];\n`;
    else if (eycProp === '禁用') code += `    [${varName} setEnabled:${!value}];\n`;
    else if (eycProp === '选中') code += `    [${varName} setState:${value ? 1 : 0}];\n`;
    else if (typeof value === 'number') code += `    [${varName} ${objcMethod}:${value}];\n`;
  }
  code += `    [[${parentId} contentView] addSubview:${varName}];\n`;
  code += `    [window addControl:${varName} name:@"${ctrl.name}"];\n`;
  return code;
}

/**
 * 生成完整的控件创建代码
 */
export function generateAllControlsCode(
  controls: WindowControlInfo[],
  windowName: string,
  windowHeight?: number
): string {
  let code = '';
  let ctrlId = 1001;

  for (const ctrl of controls) {
    code += generateControlCode(ctrl, 'window', ctrlId++, windowHeight);
  }

  return code;
}

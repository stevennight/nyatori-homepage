export const PAGE_TITLES = [
  '一位程序猿的个人主页',
  '一只程序喵',
  '正在编译的猫',
  '会写代码的黑猫',
  '猫爪下的代码',
  '今天也在敲键盘',
  '一个安静的开发者',
  '代码与猫的交界处',
  '程序喵的在线角落',
  '本地运行良好',
  '黑猫开发现场',
  '一只猫的终端',
  '正在加载灵感',
  '猫咪值班中',
  '保持好奇，持续构建',
  '偶尔写对代码',
  '在屏幕前思考',
  '写代码，也写 Bug',
  '编译中的个人主页',
  '一个开发者的像素角落',
  '代码还在生长',
  '从 Hello, World 开始',
  '猫与键盘的日常',
  '在终端里散步',
  '又一次成功运行',
  '今日份代码已加载',
  '程序喵在线',
  '欢迎来到本地环境',
  '黑猫与蓝色光标',
  '代码之外，还是代码',
  '一个变量名的诞生地',
  '正在等待下一次提交',
  '猫咪正在检查日志',
  '思路连接成功',
  '页面没有走丢',
  '像素猫的工作台',
  '当前状态：可编译',
  '这里住着一位程序员',
  '代码安静地运行着',
  '这不是报错，是问候',
  '一只会调试的猫',
  '终端旁边的位置',
  '正在与浏览器沟通',
  '今天也保持在线',
  '猫猫开发者的主页',
  '一位写代码的人',
  '光标仍在闪烁',
  '灵感偶尔通过测试',
  '由猫监督的代码',
  'Nyatori 的小小终端',
] as const;

export function pickPageTitle(previousTitle: string | null) {
  let nextIndex = Math.floor(Math.random() * PAGE_TITLES.length);

  if (PAGE_TITLES[nextIndex] === previousTitle) {
    nextIndex = (nextIndex + 1) % PAGE_TITLES.length;
  }

  return PAGE_TITLES[nextIndex];
}

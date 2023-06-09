import gsap from 'gsap'
import type { Directive } from 'vue'
// 定义指令参数类型
interface GsapDirectiveOptions {
  [key: string]: unknown
}
const gsapDirective: Directive = {
  mounted(el: any, binding) {
    // 获取绑定值，这里假设为动画属性和持续时间等选项
    const options = binding.value as GsapDirectiveOptions

    // 创建 GSAP 动画对象
    const anim = gsap.from(el, { ...options });

    // 保存动画对象，以便在更新钩子中取消动画
    (el as any)._gsapAnim = anim
  },
  // 元素更新时调用
  updated(el, binding) {
    // 取消先前的动画
    const anim = (el as any)._gsapAnim
    if (anim)
      anim.kill()

    // 执行新的动画
    const options = binding.value as GsapDirectiveOptions
    const newAnim = gsap.to(el, { ...options });
    (el as any)._gsapAnim = newAnim
  },
  // 解除绑定时调用
  unmounted(el) {
    // 取消动画
    const anim = (el as any)._gsapAnim
    if (anim)
      anim.kill()
  },
}
export default gsapDirective

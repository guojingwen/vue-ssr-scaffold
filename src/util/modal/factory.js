import Vue from 'vue'

// 单例对象（性能优化点）
export function createSingle (comp) {
    let instance
    return {
        open() {
            let Comp = Vue.extend(comp)
            if (!instance) {
                instance = new Comp({
                    el: document.createElement('div')
                })
            }
            if (instance.visible) return;
            document.getElementById('app').appendChild(instance.$el)

            Vue.nextTick(() => {
                instance.visible = true
            })
        },

        close() {
            if (instance) {
                instance.visible = false
            }
        }
    }
}

export function createToast (Comp) {
    const initData = Comp.data()
    const CompCtor = Vue.extend(Comp)
    let instance
    return function (opts) {
        if (!instance) {
            instance = new CompCtor({
                el: document.createElement('div')
            })
        }
        if (typeof opts === 'string') {
            opts = { content: opts }
        }

        if (Object.prototype.toString.call(opts) === '[object Object]') {
            if (!opts.content) {
                return console.error('The Toast component require a content parameter')
            }
            Object.assign(instance.opts, initData.opts, opts)
        }

        document.getElementById('app').appendChild(instance.$el)
        instance.open()

        return instance
    }
}

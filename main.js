import Alpine from 'alpinejs'

window.addEventListener('DOMContentLoaded', () => {
    window.Alpine = Alpine
    Alpine.start()
})

document.addEventListener('alpine:init', () => {
    Alpine.data('avatar', () => ({
        name: '',
        url: '',
        color: '',
        sizes: ['128'],
        availableSizes: ['192', '128', '76', '48', '32'],
        defaultColor: 'green',
        colors: {
            green: '#16a34a',
            red: '#dc2626',
            blue: '#1d4ed8',
            orange: '#f97316',
            gray: '#374151',
            sky: '#06b6d4',
            indigo: '#4338ca',
            yellow: '#facc15'
        },
        waitTimer: '',

        keypressHandler() {
            clearTimeout(this.waitTimer)
            this.waitTimer = setTimeout(() => this.showAvatar(), 800)
        },

        setDefaultColor(e, colorName) {
            if (this.defaultColor === colorName) {
                e.checked = true
                this.color = this.colors[colorName]
            }
        },

        watchSizes() {
            this.sizes.length
                ? (this.sizes = this.sizes.sort((sm, lg) => +lg - +sm))
                : (this.url = '')
        },

        showAvatar() {
            const name = this.name.trim()
            const color = this.color.trim()

            if (name.length <= 1 || !color.length) {
                return (this.url = '')
            }

            if (!Object.values(this.colors).includes(color)) {
                return alert('Color field not match')
            }

            const names = name.split(' ').filter((word) => !!word)
            let avatarLetters

            names.length === 1
                ? (avatarLetters = names[0].substr(0, 2))
                : (avatarLetters = names[0].charAt(0) + names[1].charAt(0))

            const url = this.generateAvatar(avatarLetters.toUpperCase(), color)
            this.url = url
        },

        /**
         * Generate a avatar
         * @private
         */
        generateAvatar(letter, color) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const maxSize = Math.max(...this.availableSizes.map((s) => +s))

            canvas.width = maxSize
            canvas.height = maxSize

            ctx.fillStyle = color
            ctx.fillRect(0, 0, maxSize, maxSize)

            ctx.font = 'bold 90px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(letter, canvas.width / 2, canvas.height / 2)

            return canvas.toDataURL('image/png')
        },

        async copyUrl() {
            if (this.url.length) {
                await navigator.clipboard.writeText(this.url)
            }
        }
    }))
})

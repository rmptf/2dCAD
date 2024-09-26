function HotkeyManager(poop) {
    const hotkeys = {}

    const handleKeydown = (event) => {
        const key = getKey(event)
        if (hotkeys[key]) {
            event.preventDefault()
            hotkeys[key](event)
        }
    }

    this.registerHotkey = function(hotkey, callback) {
        hotkeys[hotkey] = callback
    }

    this.unregisterHotkey = function(hotkey) {
        delete hotkeys[hotkey]
    }

    const getKey = (event) => {
        let key = []
        if (event.ctrlKey) key.push('Ctrl')
        if (event.shiftKey) key.push('Shift')
        if (event.altKey) key.push('Alt')
        key.push(event.key)
        return key.join('+')
    };

    document.addEventListener('keydown', handleKeydown)

    this.cleanup = function() {
        document.removeEventListener('keydown', handleKeydown)
    }

    this.restore = function() {
        document.addEventListener('keydown', handleKeydown)
    }
}

export {
    HotkeyManager
}
function SvgPath() {
    this.drawPathObj = {
        // self: [], // refactoring this (will need to change all usecases... many)
        m1: '',
        isDown: false,
        isDown2: false,
        originalFigureCount: 0,
        secondaryPathCount: 0,
    }
}

export {
    SvgPath
}
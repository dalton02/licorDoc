

class ThemeManager {

    theme = $state("light")

    setDark(){
        this.theme="dark"
        localStorage.setItem("theme","dark")
    }

    setLight(){
        this.theme="light"
        localStorage.setItem("theme","light")
    }

}

const themeManager = new ThemeManager()
export default themeManager;
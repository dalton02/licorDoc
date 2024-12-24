

class ThemeManager {

    theme = $state("dark")

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
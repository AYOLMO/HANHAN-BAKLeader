let navbarItem = document.querySelectorAll('.item')
for (let i = 0; i < navbarItem.length; i++) {
    navbarItem[i].addEventListener('click', function () {
        for (let i = 0; i < navbarItem.length; i++) {
            navbarItem[i].classList.remove('active')
        }
        this.classList.add('active')
    })
}

var typed = new Typed(".multiple-text", {
    strings: ["生活充满乐趣", "文件共享更加便捷", "网页游戏集中起来"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})
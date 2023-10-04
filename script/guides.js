const carouselEl = document.querySelector("#image-carousel")
const figureEl = document.querySelector("picture.carousel-wrapper figure")
const buttons = document.querySelectorAll(`#image-carousel button`)
const figcaptionEl = document.querySelector("#image-carousel figcaption")

//TODO ////////////////////////////////////////

const infoImgsBtns = document.querySelectorAll(".infoImgsBtn")

//TODO ////////////////////////////////////////

const select = document.querySelector("select.navBtn")




    window.addEventListener("click",(e)=> {

        let count = 0
        const target = e.target

            //** KULLANIM KILAVUZU BUTONLARA TIKLADĞINDA BİLGİ FOTORAFLARINI GÖSTERMEK */
                if(target.dataset.imgs) {
                        e.preventDefault()

                //** BUTONLARA KAYITLI IMG URL DATALARINDAN ARRAY OLUŞTURMAK */
                    const data = target.dataset.imgs.split(",")

                    //** IMG CAROUSEL'İ GÖRÜNTÜLEMEK */
                        carouselEl.classList.add("visible")

                    //** ARRAY'DAKİ DATADAN PİCTURE ELEMENTİNİN İÇİNİ OLUŞTURMAK */
                        figureEl.innerHTML = data.map((item,i)=>{
                            return `
                                <img id="${i+1}" src="${item}" alt="">
                            `
                        }).join("")

                    const imgs = document.querySelectorAll("#image-carousel figure img")

                        //** İLK GÖRÜNTÜLENCEK IMAGE'İ AYARLAMAK */
                            imgs[0].classList.add("visible")

                    //** IMAGE TAKIP CIRCLE'LARINI AYARLAMAK */
                        figcaptionEl.innerHTML = data.map((item,i)=>{
                            return `
                                <i id="${i}" class="fa-regular fa-circle"></i>
                            `
                        }).join("")

                    const iconEls = document.querySelectorAll("#image-carousel i")

                        //** ILK CIRCLE'Yİ SOLİD YAPMAK */
                            iconEls[count].className = "fa-solid fa-circle active"
            
                    buttons.forEach(btn=>btn.addEventListener("click",()=> {

                        //** CLOSE BUTON FONKSİYONU */
                            if(btn.classList.contains("closeBtn")) carouselEl.classList.remove("visible")

                        //** RİGHT BUTON FONKSİYONU */
                            if(btn.classList.contains("rightBtn") && count != data.length-1) {
                                count++
                                adjustImages(imgs,count)

                                //** KAÇINCI RESİM GÖRÜNTÜLENİYORSA, O CIRCLE'Yİ SOLİD YAPMAK */
                                        adjustCircles(iconEls,count)
                            }

                        //** LEFT BUTON FONKSİYONU */
                            if(btn.classList.contains("leftBtn") && count!=0) {
                                count--
                                adjustImages(imgs,count)

                                //** KAÇINCI RESİM GÖRÜNTÜLENİYORSA, O CIRCLE'Yİ SOLİD YAPMAK */
                                    adjustCircles(iconEls,count)
                            }
                    }))

                    //** KAÇINCI CIRCLE'A BASARSAN O FOTOYA GİTMEK */
                        iconEls.forEach(icon=> icon.addEventListener("click",(e)=>{
                            iconId = e.target.id
                            adjustImages(imgs,iconId)
                            adjustCircles(iconEls,iconId)
                            count = iconId
                        }))
                }
    })

    //TODO ////////////////////////////////////////


    //** BUTONLARA BASILDIĞINDA CLASS'LARINI AYARLAMAK */
    infoImgsBtns.forEach(btn=> btn.addEventListener("click",()=>{
        
        infoImgsBtns.forEach(btn => btn.classList.remove("active"))
        btn.classList.add("active","clicked")
    }))

    //TODO ////////////////////////////////////////

    select.addEventListener("input",(e)=> {
        console.log(e.target.value);
        window.location = `#${e.target.value}`
    })




// FONKSİYONLAR

function adjustImages(imgs,count) {
    imgs.forEach(el=>el.classList.remove("visible"))
    imgs[count].classList.add("visible")
}

function adjustCircles(iconEls,count) {
    iconEls.forEach(icon=>icon.className = "fa-regular fa-circle")
    iconEls[count].className = "fa-solid fa-circle active"
}
    





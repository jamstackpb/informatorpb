import { useEffect } from "react"

interface PFlipBook {
    graduate: Array<{
        changedToMatter: {
            [key: string]: any;
        };
        clean: string;
    } | null>;
}
export const GraduateSlider : React.FC<PFlipBook> = ({ graduate }) => {
    graduate.map((g)=>{console.log(g?.changedToMatter.image)})
    useEffect(() => {
        graduate.map((g)=>{
        const loc = document.getElementById('zdjecia')
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.src = g?.changedToMatter.image
        img.className = "w-96"
        div.appendChild(img)
        loc!.appendChild(div)
    })
    })
    return (
        <div className="w-full">
            <div className="flex flex-row gap-5 justify-center" id="zdjecia">
            </div>
        </div>
    )
}

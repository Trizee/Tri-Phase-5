import { useEffect, useRef } from 'react'

function UploadWidget(){

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dqnxw66wo',
            uploadPreset: 'Something',
            remove_header: true,
            default_transformations: [
                [{quality: "auto"},{fetch_format: "auto"}],
                [{width: 80, height: 80, crop: "fill", gravity: "auto", radius: "max"}, {fetch_format: "auto", quality: "auto"}]
              ],
            styles:{
            palette: {
                window: "#FFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0E2F5A",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link:  "#0078FF",
                action:  "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1",
            },
            frame: {
                background: "#0E2F5B99"
            },
            fonts: {
                "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
            }},
        }, function (result) {
            if (result.event == "success") {
                setPicture(result.info.url)
            }
            else {
                console.log(result)
            }
        })
    }, [])

    return (
        <>
            <button className='btn' onClick={() => widgetRef.current.open()}>
                add a
            </button>
        </>
    )
}

export default UploadWidget
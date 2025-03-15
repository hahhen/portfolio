import Folder from '@/components/app/folder'
import Link from 'next/link'
import Image from 'next/image'
import DesktopApp from '@/components/app/desktopapp'
import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import ProjectsFolder from '@/components/app/projectsfolder';

export default async function Desktop() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let { data: album, error: error1 } = await supabase
        .from('album')
        .select('id, title, cover, slug, bgvideo')
    let { data: song, error: error2 } = await supabase
        .from('song')
        .select('id, title, albumid, url')
        .order('id', { ascending: true })
    return (
        <div className="w-full p-2 flex justify-between">
            <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col z-0 justify-center items-center pointer-events-none'>
                <span className='bg-background px-4'>In Memoriam</span>
                <Image alt='Hector, my dog' src={"https://lxwahfpivnfgjefzicyw.supabase.co/storage/v1/object/sign/portfolio/media/20200706_115406.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwb3J0Zm9saW8vbWVkaWEvMjAyMDA3MDZfMTE1NDA2LmpwZyIsImlhdCI6MTcxODA2NzMxMCwiZXhwIjo0ODcxNjY3MzEwfQ.VSw2Nv6kNlJxvLkjC9TDg3QfJC2tCbKLo-KxtM2fIGo&t=2024-06-11T00%3A55%3A15.684Z"} className='rounded grayscale' width={300} height={300} />
                <span className='bg-background px-4'>Hector
                    <br />&#10013;2024
                </span>
            </div>
            <div className="grid grid-rows-3 z-10 grid-flow-col gap-4">
                <ProjectsFolder slug={"projects"} icon={"/folder.png"} title={"PROJECTS"} />
            </div>
            <div className="grid grid-rows-3 z-10 grid-flow-col gap-4">
                {album?.map((album) => (
                    <Folder key={album.id} bgVideo={album.bgvideo} slug={album.slug} icon="/folder.png" cover={album.cover} items={song.filter(song => song.albumid == album.id)} title={album.title} />
                ))}
                <DesktopApp slug={"aboutme"} title="ABOUTME" icon={"/text.png"} size={40}>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      About me
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        My name is Arthur Martins Pereira, currently based in São Paulo, Brazil.
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        I'm an 18 years old developer currently taking Computer Science at University of São Paulo. I'm proactive, creative and self-taught.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">    
                        In my free time, I like to study, program and play videogames.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">    
                        Apart from programming, I have a particular interest in architecture, classical music and the japanese culture.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">    
                        Some of my skills are:
                        HTML, CSS, JavaScript, React.js, Next.js, PostgreSQL, MySQL, PHP, AWS, Azure and TailwindCSS
                    </p>
                   <p className="leading-7 [&:not(:first-child)]:mt-6">     
                        I'm also experienced in using tools such as:
                        Photoshop, After Effects, Premiere and Figma
                   </p>
                   <p className="leading-7 [&:not(:first-child)]:mt-6">     
                        With these, I am fully able to imagine, design, develop and integrate incredible projects and follow what I am passionate about: computing and art, with these not being apart from each other.
                    </p>
                </DesktopApp>
            </div>
        </div>
    )
}

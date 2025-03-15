import Folder from '@/components/app/folder'
import Link from 'next/link'
import Image from 'next/image'
import DesktopApp from '@/components/app/desktopapp'
import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import ProjectsFolder from '@/components/app/projectsfolder';
import { ScrollArea } from '../ui/scroll-area';
import AboutMe from '../app/aboutme';
import FolderFolder from '@/components/app/folderfolder';

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
                <FolderFolder slug={"music"} icon={"/folder.png"} title={"MUSIC"}>
                    {album?.map((album) => (
                        <Folder key={album.id} bgVideo={album.bgvideo} slug={album.slug} icon="/folder.png" cover={album.cover} items={song.filter(song => song.albumid == album.id)} title={album.title} />
                    ))}
                </FolderFolder>
                <FolderFolder slug="certificates" icon="/folder.png" title="CERTIFICATIONS">
                    <Link href="https://link.byarthur.me/jap" target='_blank' className='flex gap-1 flex-col items-center'>
                        <Image alt="Contact" src="/text.png" width={40} height={40} />
                        <span className="bg-white text-center">JLPT N4</span>
                    </Link>
                    <Link href="https://link.byarthur.me/eng" target='_blank' className='flex gap-1 flex-col items-center'>
                        <Image alt="Contact" src="/text.png" width={40} height={40} />
                        <span className="bg-white text-center">NF SET C2 PROFICIENT</span>
                    </Link>
                    <Link href="https://link.byarthur.me/gitcert" target='_blank' className='flex gap-1 flex-col items-center'>
                        <Image alt="Contact" src="/text.png" width={40} height={40} />
                        <span className="bg-white text-center">GITHUB FOUNDATIONS</span>
                    </Link>
                </FolderFolder>
                <AboutMe />
            </div>
        </div >
    )
}

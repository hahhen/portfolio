import Folder from '@/components/app/folder'
import Link from 'next/link'
import Image from 'next/image'
import DesktopApp from '@/components/app/desktopapp'
import { supabase } from '@/app/layout'

export default async function Desktop() {
    let { data: album, error1 } = await supabase
        .from('album')
        .select('id, title, cover, slug, bgvideo')
    let { data: song, error2 } = await supabase
        .from('song')
        .select('id, title, albumid, url')
        .order('id', { ascending: true })
    return (
        <div className="w-full p-2 flex justify-end">
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                {album.map((album) => (
                    <Folder key={album.id} bgVideo={album.bgvideo} slug={album.slug} icon="/folder.png" cover={album.cover} items={song.filter(song => song.albumid == album.id)} title={album.title} />
                ))}
                <Link className='flex flex-col gap-1 items-center' target='_blank' href={"https://bbor.byarthur.me"}>
                    <Image src={"/text.png"} width={40} height={40} />
                    <span className="bg-white">
                        BRAIN BUREAU<br />OF RESEARCH
                    </span>
                </Link>
                <Link className='flex flex-col gap-1 items-center' target='_blank' href={"https://www.cpsforum.com.br"}>
                    <Image src={"/text.png"} width={40} height={40} />
                    <span className="bg-white">
                        FÓRUM CENTRO<br />PAULA SOUZA
                    </span>
                </Link>
                <DesktopApp slug={"aboutme"} title="ABOUTME" icon={"/text.png"} size={40}>
                    <p>
                        I&apos;m 17 years old, a developer and currently studying Systems Development along with High School at the Etec of Praia Grande. After graduating, I plan on taking Computer Science. I&apos;m proactive, creative and self-taught.
                    </p>
                    <p>
                        In my free time, I enjoy to study, program and play videogames.
                    </p>
                    <p>
                        Apart from programming, I have a particular interest in architecture, classical music and the japanese culture.
                    </p>
                </DesktopApp>
            </div>
        </div>
    )
}
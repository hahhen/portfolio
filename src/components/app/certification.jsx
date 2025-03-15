"use client"

import Link from "next/link"
import Image from "next/image"
import PDFReader from "./pdfreader"

export default function Certification({ name, link, type, slug, filename }) {
    
    return (
        type == 'web' ?
            <Link href={link} target='_blank' className='flex gap-1 flex-col items-center'>
                <Image alt="Contact" src="/text.png" width={40} height={40} />
                <span className="bg-white text-center">{name}</span>
            </Link>
            :
            <PDFReader slug={slug} name={name} link={link} filename={filename}/>
            
    )
}
"use client"

import PDFReader from "./pdfreader"

export default function Resume({ link, slug, name, filename }) {
    return (
        <PDFReader slug={slug} name={name} link={link} filename={filename} />
    )
}
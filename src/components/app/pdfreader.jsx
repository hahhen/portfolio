import DesktopApp from "./desktopapp"
import { Document, pdfjs, Page } from "react-pdf"
import { useState } from "react"
import { Button } from "../ui/button";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTranslation } from "react-i18next";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PDFReader({ link, slug, name, filename }) {
    const [numPages, setNumPages] = useState();
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation()

    const downloadFile = async () => {
        setLoading(true)
        const response = await fetch('/api/download', {
            body: JSON.stringify({ link, filename }),
            method: "POST"
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
        setLoading(false)
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <DesktopApp className={"h-[600px]"} y={-290} slug={slug} title={name} icon="/text.png" size={40}>
            <div className="flex p-2 gap-2">
                <Button variant="outline" className="flex-1" asChild>
                    <Link href={link} target='_blank' >
                        <ExternalLink /> {t("newtab")}
                    </Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={downloadFile} disabled={loading}>
                    {loading ?
                        <>
                            <Loader2 className="animate-spin" /> {t("loading")}...
                        </>
                        :
                        <>
                            <Download /> {t("download")}
                        </>
                    }
                </Button>
            </div>
            <div className="h-[520px] overflow-auto">
                <Document
                    file={link}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                width={365}
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        ),
                    )}
                </Document>
            </div>
        </DesktopApp>
    )
}
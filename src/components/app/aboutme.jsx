"use client"

import DesktopApp from "@/components/app/desktopapp"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

export default function AboutMe() {
    const { t } = useTranslation()
    return (
        <DesktopApp slug={"aboutme"} title="ABOUTME" icon={"/text.png"} size={40}>
            <ScrollArea className="h-96 p-2">
                <div className='border-b pb-2'>
                    <h2 className="scroll-m-20 text-3xl font-medium tracking-tight first:mt-0">
                        {t("aboutmetext.title")}
                    </h2>
                    <p className='italic'>{t("aboutmetext.subtitle")}</p>
                </div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p1")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p2")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p3")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p4")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p5")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p6")}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {t("aboutmetext.p7")}
                </p>
            </ScrollArea>
        </DesktopApp>
    )
}
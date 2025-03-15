'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarSub,
} from "@/components/ui/menubar"
import Logo from "@/components/gen/logo"
import Link from "next/link"
import { useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { en } from "@/locales/en";
import { jp } from "@/locales/jp";
import { pt } from "@/locales/pt";

i18next
    .use(initReactI18next)
    .init({
        lng: "en",
        resources: {
            en,
            pt,
            jp
        }
    })

export default function Header() {
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const getTime = () => {
        const currentDate = new Date();
        if (currentDate.getHours() < 12) {
            setTime(currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() + "AM")
        } else {
            setTime((currentDate.getHours() < 13 ? currentDate.getHours() : currentDate.getHours() - 12) + ":" + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() + "PM")
        }
        setDate(currentDate.toDateString())
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getTime();
        }, 2000);
        return () => clearInterval(interval)
    }, [time])

    const { t } = useTranslation();

    return (
        <Menubar className='px-4 justify-between'>
            <div className="left flex">
                <MenubarMenu>
                    <MenubarTrigger className="py-1.5"><Logo size={15} /></MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>{t('about')}</MenubarItem>
                        <MenubarSub>
                            <MenubarSubTrigger className="h-7">{t('language')}</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem onClick={() => i18next.changeLanguage("en")}>
                                    English
                                </MenubarItem>
                                <MenubarItem onClick={() => i18next.changeLanguage("pt")}>
                                    Português
                                </MenubarItem>
                                <MenubarItem onClick={() => i18next.changeLanguage("jp")}>
                                    日本語
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem>{t('restart')}</MenubarItem>
                        <div className="px-2 text-xs flex flex-col text-muted-foreground">
                            <span>{t('systeminfo')}</span>
                            <span>{t('os')}:&nbsp;ArthurOS 1.0</span>
                            <span>{t('build')}: 20070212AMP</span>
                        </div>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>{t('file')}</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>{t('share')}</MenubarItem>
                        <MenubarItem>{t('print')}</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>{t('open')}</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild>
                            <Link target="_blank" href={"https://www.linkedin.com/in/o-arthur"}>LinkedIn</Link>
                        </MenubarItem>
                        <MenubarItem asChild>
                            <Link target="_blank" href={"https://www.github.com/hahhen"}>GitHub</Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </div>
            <div className="right text-xl select-none flex">
                <span>{time}</span><span className="hidden sm:block">&nbsp;-&nbsp;{date}</span>
            </div>
        </Menubar>
    )
}
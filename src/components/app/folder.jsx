'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DesktopApp from "@/components/app/desktopapp";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactAudioPlayer from 'react-audio-player';
import Draggable from "react-draggable"
import { cn } from "../../lib/utils";
import React from "react";
import { setStateBgVideo } from "@/components/desktop/backgroundvideo";

export default function Folder({ bgVideo, slug, items, title, cover, icon }) {
    return (
        <DesktopApp slug={slug} title={title} icon={icon}>
            <ScrollArea className={"h-96"}>
                <div className="grid grid-cols-3 grid-flow-row gap-4">
                    {items.map((item, i) => (
                        <Dialog onOpenChange={(open) => {
                            open ? setStateBgVideo(bgVideo) : setStateBgVideo("")}} key={i} modal={false}>
                            <DialogTrigger className={"flex flex-col items-center"}>
                                <Image alt="Song" src={"/sound.png"} width={40} height={40} />
                                <span className="bg-white">
                                    {item.title}
                                </span>
                            </DialogTrigger>
                            <Draggable defaultPosition={{x: -192, y: -200}} handle={".header" + slug + item.id}>
                                <DialogContent onPointerDownOutside={() => event.preventDefault()}>
                                    <div>
                                        <header className={cn("appheader relative flex justify-center", "header" + slug + item.id)}>
                                            <span className="bg-white z-50 px-4 flex items-center select-none">{item.title}</span>
                                        </header>
                                        <div className="flex p-3 flex-col items-center">
                                            {cover && <Image src={cover} width={400} height={400}/>}
                                            <ReactAudioPlayer
                                                src={item.url}
                                                autoPlay
                                                controls
                                                className="w-full border"
                                            />
                                        </div>
                                    </div>
                                </DialogContent>
                            </Draggable>
                        </Dialog>
                    ))}
                </div>
            </ScrollArea>
        </DesktopApp>
    )
}
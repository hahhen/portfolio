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

export default function FolderFolder({slug,  title, icon, children }) {
    return (
        <DesktopApp slug={slug} title={title} icon={icon}>
            <ScrollArea className={"h-96"}>
                <div className="grid grid-cols-3 grid-flow-row gap-4">
                    {children}
                </div>
            </ScrollArea>
        </DesktopApp>
    )
}
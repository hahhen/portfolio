'use client'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import Draggable from "react-draggable"
import { cn } from "../../lib/utils"

export default function DesktopApp({slug, title, icon, size=50, children, className, x=-192, y=-200}) {
    return (
        <Dialog modal={false}>
            <DialogTrigger className={"flex gap-1 flex-col items-center"}>
                <Image alt="App" src={icon} width={size} height={size} />
                <span className="bg-white">
                    {title}
                </span>
            </DialogTrigger>
            <Draggable defaultPosition={{x: x, y: y}} handle={".header"+slug}>
                <DialogContent className={className} onPointerDownOutside={() => event.preventDefault()}>
                    <div>
                        <header className={cn("appheader relative flex justify-center", "header"+slug)}>
                            <span className="bg-white z-50 px-4 flex items-center select-none">{title}</span>
                        </header>
                        {children}
                    </div>
                </DialogContent>
            </Draggable>
        </Dialog>
    )
}
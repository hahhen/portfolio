'use client'

import DesktopApp from "@/components/app/desktopapp";
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Calendar, Filter, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ProjectsFolder({ slug, title, icon }) {
    const supabase = createClient()

    const [selectedTags, setSelectedTags] = React.useState('')

    async function getProjects() {
        let { data, error } = await supabase
            .from('project')
            .select("*, tag(name)")
        return data
    }

    async function getCategories() {
        let { data, error } = await supabase
            .from('category')
            .select("*, tag(name)")
            .order("order", { ascending: true })
        return data
    }

    const { data: preprojects, isLoading: isProjectLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects })
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

    const [projects, setProjects] = React.useState(preprojects)
    const [filterByOr, setFilterByOr] = React.useState(true)

    useEffect(() => {
        if (preprojects) {
            let filteredProjects = [...preprojects].filter((project) => {
                if (selectedTags.length === 0) {
                    return true
                } else {
                    if (filterByOr) {
                        return selectedTags.some((selectedTag) => project.tag.some((tag) => selectedTag.name === tag.name))
                    } else {
                        return selectedTags.every((selectedTag) => project.tag.some((tag) => selectedTag.name === tag.name))
                    }
                }
            })
            setProjects(filteredProjects)
        }
    }, [selectedTags, preprojects, filterByOr])

    return (
        <DesktopApp className={"w-[700px] h-[500px] overflow-hidden"} slug={slug} title={title} icon={icon}>
            <SidebarProvider>
                <Sidebar variant="floating" className="mt-4 h-[100%-20px]">
                    <SidebarContent className="no-scrollbar px-2 py-1">
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" className="w-8 h-8" onClick={() => setFilterByOr(!filterByOr)}>
                                <Filter className="text-foreground" />
                            </Button>
                            {filterByOr ? "OR" : "AND"}
                        </div>
                        {categories?.map((category, i) => (
                            <SidebarGroup key={i} className="p-0">
                                <SidebarGroupLabel>{category.name}</SidebarGroupLabel>
                                <SidebarGroupContent className="flex flex-wrap gap-1">
                                    {category.tag.map((tag, i) => (
                                        <button onClick={() => {
                                            if (selectedTags.includes(tag)) {
                                                setSelectedTags(selectedTags.filter((item) => item !== tag))
                                            } else {
                                                setSelectedTags([...selectedTags, tag])
                                            }
                                        }} key={i} className={cn("px-2 py-[2px] rounded-lg text-sm", selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                                            {tag.name}
                                        </button>
                                    ))}
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}
                    </SidebarContent>
                </Sidebar>
                <ScrollArea className={"h-[475px]"}>
                    <SidebarTrigger />
                    <div className="px-4 flex flex-col gap-4">
                        {isProjectLoading ? <p>Loading...</p>
                            :
                            projects?.map((project, i) => (
                                <div key={project.id} className="rounded-lg rounded-b-none bg-secondary overflow-hidden">
                                    <div>
                                        <Image alt="Banner" src={project.banner} className="w-full aspect-[45/9] object-cover" width={400} height={400} />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Image alt="Icon" src={project.icon} width={40} height={40} className="rounded-lg" />
                                            <div className="w-full flex items-center justify-between">
                                                <h2 className="scroll-m-20 text-3xl tracking-tight first:mt-0 pb-0">
                                                    {project.name}
                                                </h2>
                                                <span className="text-muted-foreground text-sm">
                                                    {dayjs(project.date).format('MMMM YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="leading-5 text-muted-foreground text-md">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {project.url.map((url, i) => (
                                                <Link className="hover:underline leading-7" key={i} href={url.url}>
                                                    {url.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex mt-2 flex-wrap gap-1">
                                            {project.tag.map((tag, i) => (
                                                <span key={i} className="bg-primary text-primary-foreground px-2 py-[2px] rounded-lg text-sm">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
            </SidebarProvider>
        </DesktopApp>
    )
}
'use client'
import { Bell, Search, Settings, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-6 border-b bg-white">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold">Overview</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="Search for something"
            className="w-64 md:w-80 pl-10"
          />
        </div>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}



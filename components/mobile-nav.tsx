"use client"
import Link from "next/link"
import { X, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: 20 },
  }

  const links = [
    { href: "#counseling", label: "Counseling" },
    { href: "#relationship", label: "Relationship" },
    { href: "#listeners", label: "Listeners" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 shadow-xl flex flex-col"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="inline-block font-bold text-xl">SAVAYAS</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-6 px-4">
              <nav className="flex flex-col space-y-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={link.href}
                      className="text-xl font-medium text-gray-800 hover:text-pink-500 transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full border-pink-200 hover:bg-pink-50">
                  <Link href="/signin" onClick={onClose}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full bg-pink-500 text-white hover:bg-pink-600">
                  <Link href="/signup" onClick={onClose}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


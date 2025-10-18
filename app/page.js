'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, Send, Loader2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const socialLinks = {
    github: 'https://github.com/AdepuSanjay',
    linkedin: 'https://www.linkedin.com/in/adepu-sanjay-3746662a9/',
    email: 'mailto:adepusanjay812@gmail.com',
  }

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Scroll spy for active nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPos = window.scrollY + 150
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      alert('Message sent successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/70 border-b border-border z-[999]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-lg tracking-tight"
          >
            Adepu Sanjay
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() =>
                  document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`nav-item px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === item
                    ? 'text-primary font-semibold'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Nav */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white/90 backdrop-blur-md"
            >
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' })
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-6 py-3 text-sm font-medium ${
                    activeSection === item
                      ? 'text-primary bg-hover'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-32 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Hello, I'm <span className="text-primary">Adepu Sanjay</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-secondary max-w-xl"
        >
          Full Stack Developer specializing in modern web and mobile applications using
          React, Node.js, and Next.js.
        </motion.p>
        <div className="flex gap-3 mt-8">
          <Button
            className="btn-premium"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Work <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="btn-premium-outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact
          </Button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-secondary max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer who believes in building clean,
            scalable, and meaningful digital experiences. I enjoy transforming ideas into
            real-world applications with clean architecture and aesthetic design.
          </p>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 border-t border-border bg-[#f5f6f7]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="premium-card rounded-2xl border border-border bg-card p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {i === 1
                      ? 'College MIS Portal (Attendance System)'
                      : 'Vektor Insight – Code Debugger'}
                  </h3>
                  <p className="text-secondary text-sm mb-4">
                    {i === 1
                      ? 'An intelligent college management system for TKRCET with student and faculty dashboards.'
                      : 'Multi-language debugging platform with real-time analysis and visualization.'}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button
                    className="btn-premium"
                    onClick={() =>
                      window.open(
                        i === 1
                          ? 'https://tkrcet.vercel.app'
                          : 'https://vektor-insight.vercel.app',
                        '_blank'
                      )
                    }
                  >
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-premium-outline"
                    onClick={() => window.open('https://github.com/AdepuSanjay', '_blank')}
                  >
                    Source
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t border-border">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <p className="text-secondary mb-8">
            Let's collaborate or discuss new opportunities.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" className="form-input-premium" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" className="form-input-premium" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} placeholder="Type your message..." className="form-input-premium" required />
            </div>
            <Button type="submit" className="btn-premium w-full" disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>
          <div className="flex justify-center space-x-6 mt-10">
            <Github className="cursor-pointer hover:text-primary" onClick={() => window.open(socialLinks.github)} />
            <Linkedin className="cursor-pointer hover:text-primary" onClick={() => window.open(socialLinks.linkedin)} />
            <Mail className="cursor-pointer hover:text-primary" onClick={() => window.open(socialLinks.email)} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border text-center text-secondary text-sm">
        © {new Date().getFullYear()} Adepu Sanjay. All rights reserved.
      </footer>
    </div>
  )
}
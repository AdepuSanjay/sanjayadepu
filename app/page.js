'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Menu, X, Github, Linkedin, Mail, ChevronRight, Send, Loader2, Sun, Moon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Socials
  const socialLinks = {
    github: 'https://github.com/AdepuSanjay',
    linkedin: 'https://www.linkedin.com/in/adepu-sanjay-3746662a9/',
    email: 'mailto:adepusanjay812@gmail.com',
  }

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  // Handle scroll for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const scrollPos = window.scrollY + 100
      for (const sec of sections) {
        const el = document.getElementById(sec)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sec)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
    }
  }

  // Contact form simulation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => setIsSent(false), 3000)
    }, 2000)
  }

  return (
    <main className="relative bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 z-[999]"
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold tracking-tight">Adepu Sanjay</h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item text-sm font-medium px-3 py-2 transition ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'hover:text-blue-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden flex flex-col px-4 pb-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2 text-left ${
                    activeSection === item.id
                      ? 'text-blue-600 font-medium'
                      : 'hover:text-blue-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl px-4"
        >
          <span className="badge-premium text-sm mb-4 block">
            Available for opportunities
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Hi, I'm Adepu Sanjay
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
            A Full Stack Developer building practical and efficient applications
            using React, Node.js, and modern technologies.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              className="btn-premium"
              onClick={() => scrollToSection('projects')}
            >
              View My Work <ChevronRight size={16} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="btn-premium-outline"
              onClick={() => scrollToSection('contact')}
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 section-bg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <h2 className="heading-2 mb-6">About Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            I'm a developer focused on building user-friendly web and mobile
            applications. My philosophy: “Write clean code that works.” I love
            combining logic, design, and technology to solve real-world
            problems.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900 section-bg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <h2 className="heading-2 mb-12">Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[{
              title: 'College MIS Portal',
              desc: 'A complete college management platform with faculty and student portals.',
              tech: ['React', 'Node.js', 'MongoDB'],
              link: 'https://tkrcet.vercel.app',
              image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1757834562/uploads/keoo0vprrm4tf48yptcf.jpg'
            },
            {
              title: 'Vektor Insight – Code Analyzer',
              desc: 'A multi-language code debugging and visualization platform.',
              tech: ['React', 'Node.js', 'Express'],
              link: 'https://vektor-insight.vercel.app/',
              image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1757839000/uploads/vektor_insight_preview.jpg'
            }].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="premium-card rounded-xl overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-56 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tech.map((t) => (
                      <Badge key={t} className="badge-premium text-xs">{t}</Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => window.open(p.link, '_blank')}
                    className="text-blue-600 hover:underline"
                  >
                    View Project ↗
                  </Button>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 section-bg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <h2 className="heading-2 mb-6">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'Node.js', 'MongoDB', 'Next.js', 'Express', 'FastAPI', 'TailwindCSS', 'TypeScript'].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="premium-card rounded-xl p-4 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 section-bg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <h2 className="heading-2 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl backdrop-blur-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div>
              <Label>Name</Label>
              <Input className="form-input-premium" required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" className="form-input-premium" required />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea rows={5} className="form-input-premium" required />
            </div>
            <Button
              type="submit"
              disabled={isSending}
              className="btn-premium w-full"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {isSent && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-medium mt-3"
              >
                ✅ Message sent successfully!
              </motion.p>
            )}
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-200/50 dark:border-slate-800/50">
        <p className="text-slate-500 text-sm">© 2025 Adepu Sanjay. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-3">
          <Button variant="ghost" size="icon" onClick={() => window.open(socialLinks.github, '_blank')}>
            <Github />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open(socialLinks.linkedin, '_blank')}>
            <Linkedin />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => window.open(socialLinks.email, '_blank')}>
            <Mail />
          </Button>
        </div>
      </footer>
    </main>
  )
}
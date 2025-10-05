'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Server,
  Smartphone,
  Database,
  ChevronRight,
  Send,
  Award,
  Trophy,
  Loader2,
} from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Social media links
  const socialLinks = {
    github: 'https://github.com/AdepuSanjay',
    linkedin:
      'https://www.linkedin.com/in/adepu-sanjay-3746662a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'mailto:adepusanjay812@gmail.com',
  }

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  // Projects data with Cloudinary videos
  const projects = [
    {
      id: 1,
      title: 'College MIS Portal (Attendance Management System)',
      description:
        'A comprehensive college management system built for TKRCET with faculty and student portals for attendance tracking.',
      video:
        'https://res.cloudinary.com/dppiuypop/video/upload/v1723456000/uploads/mis_demo.mp4',
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Cloudinary'],
      category: 'fullstack',
      features: [
        '👨‍🏫 Faculty login and attendance marking',
        '🧑‍🎓 Student attendance tracking',
        '📱 Fully responsive design',
        '☁️ Deployed on Vercel',
        'Complete end-to-end development',
      ],
      demoUrl: 'https://tkrcet.vercel.app',
      codeUrl: '#',
    },
    {
      id: 2,
      title: 'Vektor Insight – Code Debugger & Analyzer',
      description:
        'A professional multi-language debugging and code analysis platform.',
      video:
        'https://res.cloudinary.com/dppiuypop/video/upload/v1723456100/uploads/vektor_demo.mp4',
      tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Vercel'],
      category: 'fullstack',
      features: [
        '🔍 Real-time code debugging and error tracing',
        '📊 Static code analysis for bugs, vulnerabilities, and performance issues',
        '💻 Supports multiple languages: C, C++, Python, Java, JavaScript, React.js, Node.js, etc.',
        '📂 Visualizations of dependencies and code flow',
        '☁️ Hosted on Vercel for seamless global access',
      ],
      demoUrl: 'https://vektor-insight.vercel.app/',
      codeUrl: '#',
    },
  ]

  // Achievements
  const achievements = [
    {
      id: 1,
      title:
        'AI-Driven Drowsiness Detection System | Team Member (Grant Approved - Development Phase)',
      description: [
        'Part of a 3-member student team that secured a ₹15 Lakh grant from the Ministry of MSME',
        'Project focuses on road safety through AI analysis of driver alertness',
        'Currently in research and planning phase for development',
      ],
      icon: Trophy,
      date: '2024',
      image: null,
    },
    {
      id: 2,
      title: 'Certificate of Appreciation - MIS Portal Development',
      description: [
        'Received recognition and certificate from TKRCET for developing the college MIS Portal',
        'Awarded for technical excellence and contribution to college infrastructure',
      ],
      icon: Award,
      date: '2023',
      image:
        'https://res.cloudinary.com/dppiuypop/image/upload/v1757481539/uploads/gxs0kkwbl57jl4ocbk54.jpg',
    },
  ]

  // Filter projects
  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)

  // Animation variants
  const fadeInUp = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  }

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 64
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  // Contact form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      alert('Message sent successfully!')
      e.target.reset()
    }, 2000)
  }

  return (
    <div>
      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-0 py-16 lg:py-24 bg-slate-50 border-t border-slate-200"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">
              Projects
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Some of the work I've done recently
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={isMobile ? {} : { y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group border border-slate-200 bg-white">
                    <div className="aspect-video overflow-hidden relative">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <CardHeader className="pb-2 lg:pb-4">
                      <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                        {project.title}
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.demoUrl && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-slate-100 rounded-full"
                              onClick={() => window.open(project.demoUrl, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-slate-100 rounded-full"
                          >
                            <Github className="h-3 w-3 lg:h-4 lg:w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-xs lg:text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {project.features && (
                        <div className="mb-3">
                          <ul className="text-xs text-slate-600 space-y-1">
                            {project.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Server,
  Smartphone,
  Database,
  ChevronRight,
  Send,
  Star
} from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with React, Node.js, and MongoDB featuring payment integration, admin dashboard, and responsive design.',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description:
        'React Native mobile application for task management with real-time synchronization and offline capabilities.',
      image:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      tags: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description:
        'Next.js dashboard for social media analytics with real-time data visualization and responsive charts.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      tags: ['Next.js', 'Chart.js', 'API Integration'],
      category: 'frontend',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 4,
      title: 'REST API Service',
      description:
        'Scalable REST API built with Node.js and Express, featuring authentication, rate limiting, and comprehensive documentation.',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      tags: ['Node.js', 'Express', 'JWT', 'Swagger'],
      category: 'backend',
      demoUrl: '#',
      codeUrl: '#'
    }
  ]

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)

  const experience = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2023 - Present',
      description:
        'Leading development of scalable web applications using MERN stack. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipelines'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      period: '2021 - 2023',
      description:
        'Developed responsive web applications and mobile apps. Collaborated with cross-functional teams to deliver high-quality products.',
      achievements: [
        'Delivered 15+ projects successfully',
        'Reduced development time by 30%',
        'Implemented automated testing'
      ]
    },
    {
      id: 3,
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      period: '2020 - 2021',
      description:
        'Started career building dynamic web applications with modern technologies. Focused on learning and contributing to various projects.',
      achievements: ['Completed 10+ projects', 'Learned MERN stack', 'Contributed to open source']
    }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 }
    }
  }

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }

  // ✅ JS (no TS here)
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 64
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }, 100)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-[9999] border-b border-slate-200 pointer-events-auto">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-black"
            >
              Adepu Sanjay
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-black text-white'
                      : 'text-slate-600 hover:text-black hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4 border-t border-slate-200 overflow-hidden bg-white/95 backdrop-blur-md"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-3 px-4 text-sm font-medium rounded-lg mx-2 my-1 transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-black text-white'
                        : 'text-slate-600 hover:text-black hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section (no image here) */}
      <section id="home" className="relative z-0 pt-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:space-y-8 text-center lg:text-left order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  variant="outline"
                  className="mb-4 lg:mb-6 bg-blue-50 text-blue-700 border-blue-200"
                >
                  Available for opportunities
                </Badge>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black leading-tight">
                Hi, I'm{' '}
                <span className="text-black relative">
                  Adepu Sanjay
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-medium">
                Full Stack Developer
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                Passionate about creating exceptional digital experiences with modern technologies.
                Specialized in MERN stack, Next.js, and React Native development.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-slate-800 text-white h-10 lg:h-12 px-6 lg:px-8 text-sm lg:text-base"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                  <ChevronRight className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 h-10 lg:h-12 px-6 lg:px-8 text-sm lg:text-base"
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                </Button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4 pt-2 lg:pt-4">
                <Button variant="ghost" size="sm" className="p-2 lg:p-3 hover:bg-slate-100 rounded-full">
                  <Github className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 lg:p-3 hover:bg-slate-100 rounded-full">
                  <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 lg:p-3 hover:bg-slate-100 rounded-full">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </motion.div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* About Section (with your photo) */}
      <section id="about" className="relative z-0 py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">
              About Me
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Passionate full-stack developer with expertise in building scalable web and mobile applications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-8"
            >
              {/* Profile image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <img
                    src="https://customer-assets.emergentagent.com/job_7fe2edb6-7e3e-4210-8522-8993d3f7a4f2/artifacts/2wb3megx_file_000000002f6461f799c1b6af4733c280%20%281%29.jpg"
                    alt="Adepu Sanjay"
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong foundation in modern web technologies.
                With expertise in the MERN stack, Next.js, and React Native, I create robust and scalable
                applications that deliver exceptional user experiences.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                I have a good attitude towards learning new technologies and solving complex problems.
                My goal is to write clean, efficient code and contribute to meaningful projects that make a difference.
              </p>

              <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-4 lg:pt-6">
                {[
                  { value: '3+', label: 'Years Experience' },
                  { value: '50+', label: 'Projects Completed' },
                  { value: '10+', label: 'Technologies' },
                  { value: '100%', label: 'Client Satisfaction' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-3 lg:p-6 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <div className="text-xl lg:text-3xl font-bold text-black mb-1 lg:mb-2">{stat.value}</div>
                    <div className="text-xs lg:text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-6"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-8">Work Experience</h3>

              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border border-slate-200 bg-white">
                    <CardHeader className="pb-2 lg:pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base lg:text-lg text-black">{exp.title}</CardTitle>
                          <CardDescription className="text-blue-600 font-semibold text-sm lg:text-base">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs lg:text-sm"
                        >
                          {exp.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-slate-600 mb-3 lg:mb-4 leading-relaxed text-xs lg:text-sm">
                        {exp.description}
                      </p>
                      <div className="space-y-1 lg:space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center text-xs lg:text-sm text-slate-600">
                            <Star className="h-3 w-3 lg:h-4 lg:w-4 text-blue-500 mr-2 lg:mr-3 flex-shrink-0" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-0 py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">Featured Projects</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12 lg:mb-16"
          >
            <div className="flex flex-wrap gap-2 p-2 bg-white rounded-lg border border-slate-200">
              {['all', 'fullstack', 'frontend', 'backend', 'mobile'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 lg:px-6 py-2 rounded-lg transition-all duration-200 text-xs lg:text-sm ${
                    selectedFilter === filter ? 'bg-black hover:bg-slate-800 text-white' : 'hover:bg-slate-100'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                

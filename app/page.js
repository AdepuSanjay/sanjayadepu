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
  Award,
  Trophy
} from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  // Social media links
  const socialLinks = {
    github: 'https://github.com/AdepuSanjay',
    linkedin: 'https://www.linkedin.com/in/adepu-sanjay-3746662a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'mailto:adepusanjay812@gmail.com'
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
    { id: 'contact', label: 'Contact' }
  ]

  // Projects data - Added MIS Portal project
  const projects = [
    {
      id: 1,
      title: 'College MIS Portal (Attendance Management System)',
      description:
        'Developed a comprehensive college management system for TKRCET with faculty and student portals for attendance tracking.',
      image:'https://res.cloudinary.com/dppiuypop/image/upload/v1757834562/uploads/keoo0vprrm4tf48yptcf.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'express js','cloudnary'],
      category: 'fullstack',
      features: [
        '👨‍🏫 Faculty login and attendance marking',
        '🧑‍🎓 Student attendance tracking',
        '📱 Fully responsive design',
        '☁️ Hosted on Vercel',
        'End-to-end development'
      ],
      demoUrl: 'https://tkrcet.vercel.app',
      codeUrl: '#'
    },
    {
      id: 2,
      title: 'Studymate AI',
      description:
        'Mobile app for task management with React Native, featuring real-time sync and offline functionality.',
      image:
        'https://res.cloudinary.com/dppiuypop/image/upload/v1757836739/uploads/d3cdddvp3uaputsicmmd.jpg',
      tags: ['react js', 'nodejs', 'express', 'mongodb'],
      category: 'fullstack',
      demoUrl: '#',
      codeUrl: '#'
    }
  ]

  // Achievements data - Removed MIS Portal, kept only the award
  const achievements = [
    {
      id: 1,
      title: 'AI-Driven Drowsiness Detection System | Team Member (Grant Approved - Development Phase)',
      description: [
        'Part of a 3-member student team that secured a ₹15 Lakh grant from the Ministry of MSME',
        'Project focuses on road safety through AI analysis of driver alertness',
        'Currently in research and planning phase for development'
      ],
      icon: Trophy,
      date: '2024',
      image: null
    },
    {
      id: 2,
      title: 'Certificate of Appreciation - MIS Portal Development',
      description: [
        'Received recognition and certificate from TKRCET for developing the college MIS Portal',
        'Awarded for technical excellence and contribution to college infrastructure'
      ],
      icon: Award,
      date: '2023',
      image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1757481539/uploads/gxs0kkwbl57jl4ocbk54.jpg'
    }
  ];

  // Filter projects based on selected category
  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)

  // Animation variants - simplified for mobile
  const fadeInUp = {
    initial: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const slideInRight = {
    initial: isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }

  const fadeIn = {
    initial: isMobile ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
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
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'achievements', 'skills', 'contact']
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
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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

      {/* Hero Section */}
      <section id="home" className="relative z-0 pt-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:space-y-8 text-center max-w-2xl"
            >
              <motion.div
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
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
                I build web and mobile applications using modern technologies like React, Node.js, 
                and React Native. Focused on creating practical solutions that work well.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4 justify-center">
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

              <div className="flex justify-center space-x-4 pt-2 lg:pt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 lg:p-3 hover:bg-slate-100 rounded-full"
                  onClick={() => window.open(socialLinks.github, '_blank')}
                >
                  <Github className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 lg:p-3 hover:bg-slate-100 rounded-full"
                  onClick={() => window.open(socialLinks.linkedin, '_blank')}
                >
                  <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 lg:p-3 hover:bg-slate-100 rounded-full"
                  onClick={() => window.open(socialLinks.email, '_blank')}
                >
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-0 py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">
              About Me
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Full-stack developer with experience building web and mobile applications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4 lg:space-y-8"
            >
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <img
                    src="https://customer-assets.emergentagent.com/job_7fe2edb6-7e3e-4210-8522-8993d3f7a4f2/artifacts/2wb3megx_file_000000002f6461f799c1b6af4733c280%20%281%29.jpg"
                    alt="Adepu Sanjay"
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover rounded-full"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                I'm a Full Stack Developer with experience in modern web technologies. I work with 
                MERN stack, Next.js, and React Native to build applications that solve real problems.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                I enjoy learning new technologies and working on practical solutions. My approach 
                is to write clean, maintainable code that gets the job done.
              </p>


            </motion.div>

            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-8">What I Do</h3>

              <div className="space-y-4">
                <Card className="border border-slate-200 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base lg:text-lg text-black">Full Stack Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-3 leading-relaxed text-xs lg:text-sm">
                      Building web applications with React, Node.js, and MongoDB
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">React</Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Node.js</Badge>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">MongoDB</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base lg:text-lg text-black">Mobile Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-3 leading-relaxed text-xs lg:text-sm">
                      Creating mobile applications with React Native and Flutter
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">React Native</Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">Flutter</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base lg:text-lg text-black">AI & Machine Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-3 leading-relaxed text-xs lg:text-sm">
                      Working on AI solutions including the Drowsiness Detection system
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-red-100 text-red-700">AI</Badge>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">Machine Learning</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-0 py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
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

          {/* Project Filters */}
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                </Button>
              ))}
            </div>
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
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
                          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
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

      {/* Achievements Section */}
      <section id="achievements" className="relative z-0 py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">
              Achievements & Certifications
            </h2>
          </motion.div>

          <div className="space-y-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="border border-slate-200 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-base lg:text-lg text-black">
                    {achievement.image ? (
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-300 shadow-sm"
                      />
                    ) : (
                      <achievement.icon className="w-5 h-5 text-slate-600" />
                    )}
                    <span className="font-semibold">{achievement.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-xs lg:text-sm text-slate-600 space-y-2">
                    {achievement.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-0 py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 lg:mb-6">
              Skills
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Technologies I use for building applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Code, title: 'Frontend', desc: 'React, Next.js, TypeScript' },
              { icon: Server, title: 'Backend', desc: 'Node.js, Express, APIs' },
              { icon: Database, title: 'Database', desc: 'MongoDB, MySQL, Redis' },
              { icon: Smartphone, title: 'Mobile', desc: 'React Native, Flutter' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={isMobile ? {} : { y: -5 }}
                className="text-center group cursor-pointer"
              >
                <Card className="p-4 lg:p-8 border border-slate-200 bg-white h-full">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-6 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 lg:h-10 lg:w-10 text-blue-600" />
                  </div>
                  <h3 className="text-sm lg:text-lg font-bold text-black mb-2 lg:mb-3">{item.title}</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
<section id="contact" className="relative z-0 py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
  <div className="container mx-auto px-4 max-w-3xl">
    <motion.div
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
        Get In Touch
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-slate-600">
        Fill out the form below and I’ll get back to you soon.
      </p>
    </motion.div>

    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = {
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }

        const res = await fetch("https://sanjayadepu-ax58.vercel.app/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          alert("Message sent successfully ✅")
          e.target.reset()
        } else {
          alert("Failed to send message ❌")
        }
      }}
      className="space-y-6 bg-white shadow p-6 rounded-2xl border border-slate-200"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows="5" required />
      </div>

      <Button type="submit" className="bg-black text-white hover:bg-slate-800 w-full">
        Send Message <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  </div>
</section>




      {/* Footer */}
      <footer className="py-8 lg:py-12 bg-white text-slate-900 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <p className="text-slate-600 text-sm lg:text-base">© 2024 Adepu Sanjay. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4 lg:mt-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-black p-2 lg:p-3 rounded-full hover:bg-slate-100"
                onClick={() => window.open(socialLinks.github, '_blank')}
              >
                <Github className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-black p-2 lg:p-3 rounded-full hover:bg-slate-100"
                onClick={() => window.open(socialLinks.linkedin, '_blank')}
              >
                <Linkedin className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-black p-2 lg:p-3 rounded-full hover:bg-slate-100"
                onClick={() => window.open(socialLinks.email, '_blank')}
              >
                <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
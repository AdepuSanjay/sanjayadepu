'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Menu, X, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Server, Smartphone, Database, ChevronRight, Send, Award, Trophy } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)

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
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
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

  // Skills data - Updated with FastAPI and React Native Expo CLI
  const skills = [
    { name: 'Frontend', items: ['React', 'Next.js', 'HTML/CSS', 'JavaScript', 'TypeScript'], icon: Code },
    { name: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'MongoDB', 'SQL'], icon: Server },
    { name: 'Mobile', items: ['React Native Expo CLI'], icon: Smartphone },
    { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'], icon: Database }
  ]

  // Projects data - Updated StudyMate project
  const projects = [
    { 
      id: 1, 
      title: 'College MIS Portal (Attendance Management System)', 
      description: 'Developed a comprehensive college management system for TKRCET with faculty and student portals for attendance tracking.', 
      image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1757834562/uploads/keoo0vprrm4tf48yptcf.jpg', 
      tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Cloudinary'], 
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
      title: 'StudyMate AI', 
      description: 'AI-powered learning platform designed for students with AI tutoring, exam preparation, and personalized study plans.', 
      image: 'https://res.cloudinary.com/dppiuypop/image/upload/v1757836739/uploads/d3cdddvp3uaputsicmmd.jpg', 
      tags: ['React', 'Node.js', 'FastAPI', 'MongoDB'], 
      category: 'fullstack', 
      features: [
        '🤖 AI-Powered Assistance across academic subjects',
        '📚 Exam preparation and revision support',
        '🎯 Personalized study plans',
        '🌍 Multilingual support',
        '🔍 Interactive learning experience'
      ], 
      demoUrl: 'https://studymate-swart.vercel.app', 
      codeUrl: '#' 
    }
  ]

  // Achievements data
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
  ]

  // Filter projects based on selected category
  const filteredProjects = selectedFilter === 'all' ? projects : projects.filter((project) => project.category === selectedFilter)

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
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'achievements', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSending(false)
      setFormData({ name: '', email: '', message: '' })
      alert('Message sent successfully!')
    }, 2000)
  }

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
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-black' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`py-2 text-left text-sm font-medium ${
                        activeSection === item.id ? 'text-black' : 'text-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
                Full Stack Developer
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-8">
                I build responsive web applications with modern technologies.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="bg-black text-white hover:bg-slate-800"
                >
                  View Projects
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="outline"
                  className="border-black text-black hover:bg-slate-100"
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-slate-200 rounded-full overflow-hidden shadow-xl">
                {/* Placeholder for profile image */}
                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                  <span className="text-6xl font-bold text-slate-600">AS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              About Me
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
              I'm a passionate full-stack developer with experience in building modern web applications using React, Node.js, and various databases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
            >
              <h3 className="text-lg font-semibold text-black mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-black">Bachelor of Technology in Computer Science</h4>
                  <p className="text-slate-600">TKR College of Engineering and Technology</p>
                  <p className="text-sm text-slate-500">2021 - 2025</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
            >
              <h3 className="text-lg font-semibold text-black mb-4">Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-black">Full Stack Developer</h4>
                  <p className="text-slate-600">Freelance</p>
                  <p className="text-sm text-slate-500">2023 - Present</p>
                  <p className="text-sm text-slate-600 mt-2">
                    Developing web applications using React, Node.js, and MongoDB.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              My Projects
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              Here are some of the projects I've worked on.
            </p>
          </motion.div>

          {/* Project Filters */}
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              className="text-xs sm:text-sm"
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'fullstack' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('fullstack')}
              className="text-xs sm:text-sm"
            >
              Full Stack
            </Button>
            <Button
              variant={selectedFilter === 'frontend' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('frontend')}
              className="text-xs sm:text-sm"
            >
              Frontend
            </Button>
            <Button
              variant={selectedFilter === 'backend' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('backend')}
              className="text-xs sm:text-sm"
            >
              Backend
            </Button>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start text-sm text-slate-600">
                          <span className="mr-2">•</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <Button size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Code size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Achievements
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              Recognition and accomplishments throughout my journey.
            </p>
          </motion.div>

          <div className="space-y-8">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={achievement.id}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-full">
                      <IconComponent size={24} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-black">{achievement.title}</h3>
                        <span className="text-sm text-slate-500 mt-1 sm:mt-0">{achievement.date}</span>
                      </div>
                      <ul className="space-y-2">
                        {achievement.description.map((item, index) => (
                          <li key={index} className="text-slate-600 text-sm sm:text-base flex">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {achievement.image && (
                        <div className="mt-4">
                          <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-full max-w-sm rounded-lg border border-slate-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Skills
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              Technologies and tools I work with.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillCategory, index) => {
              const IconComponent = skillCategory.icon
              return (
                <motion.div
                  key={index}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent size={20} className="text-black" />
                    <h3 className="text-lg font-semibold text-black">{skillCategory.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs sm:text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )
            })}
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
              Fill out the form below and I'll get back to you soon.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Mail size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <a href={socialLinks.email} className="text-slate-600 hover:text-black">
                      adepusanjay812@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <MapPin size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Location</h3>
                    <p className="text-slate-600">Hyderabad, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <Phone size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <p className="text-slate-600">+91 8121282930</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-black mb-3">Follow me</h3>
                  <div className="flex gap-3">
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      <Github size={20} className="text-black" />
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      <Linkedin size={20} className="text-black" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Feel free to reach out for collaborations or inquiries.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-slate-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Adepu Sanjay. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-black"
              >
                <Github size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-black"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
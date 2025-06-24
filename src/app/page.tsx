'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  Sun, Moon, Download, Award, Briefcase, GraduationCap, Heart, Mail, Phone,
  Github, Linkedin, Instagram, Facebook, Menu, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const educationData = [
    { year: '2025', degree: 'B.Tech CSE (CTIS)', institution: 'Assam Down Town University', detail: 'Pursuing' },
    { year: '2021', degree: '12th (AHSEC)', institution: 'Down Town Academy, Guwahati', detail: '76%' },
    { year: '2019', degree: '10th (CBSE)', institution: 'Green Meadows School, Guwahati', detail: '66%' },
];

const certificationsData = [
    { title: 'Cybersecurity', issuer: 'NSDC', icon: Award },
    { title: 'AWS Academy Cloud Foundation', issuer: 'AWS', icon: Award },
    { title: 'Basics of Python', issuer: 'Infosys', icon: Award },
];

const projectsData = [
  {
    title: 'Gym Web Application',
    description: 'A responsive gym web app with user authentication, booking management, MySQL backend, and admin panel for managing clients and bookings.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    title: 'Mood-munch',
    description: 'A generative AI-powered resume generator that uses Google Gemini API to create custom resumes. Features an object detection module to automatically detect ingredients for recipe-style resume storytelling.',
    technologies: ['React', 'Next.js', 'Generative AI', 'Google Gemini API', 'Computer Vision'],
  },
];

const softSkills = ['Quick Adaptable', 'Flexible', 'Active Listener'];
const technicalSkills = Array.from(new Set(projectsData.flatMap(p => p.technologies)));
const achievementsData = ['Participant, ADTU Cricket League - Assam Down Town University, Guwahati'];
const hobbiesData = ['Reading articles', 'Playing cricket'];
const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/aadarsh-kumar-067116272', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Aadarshduby', icon: Github },
  { name: 'Instagram', href: 'https://www.instagram.com/aadarsh7310', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
];

export default function PortfolioPage() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [currentYear, setCurrentYear] = useState<number>();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    const sectionIds = ['home', ...navLinks.map(l => l.href.substring(1))];
    sectionIds.forEach(id => {
      sectionsRef.current[id] = document.getElementById(id);
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  
  const NavMenu = ({ isMobile = false }) => (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex md:items-center md:space-x-6"}>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            activeSection === link.href.substring(1) ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-headline font-bold text-lg">Aadarsh Kumar Dubey</a>
          <div className="flex items-center space-x-4">
            <NavMenu />
            <Button variant="outline" size="sm" asChild>
                <a href="/aadarsh_dubey_resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" /> Resume
                </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon"><Menu/></Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-headline font-bold text-lg">Menu</h3>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon"><span className="sr-only">Close</span></Button>
                            </SheetClose>
                        </div>
                        <NavMenu isMobile={true}/>
                    </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="fade-in-up">
                        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Aadarsh Kumar Dubey</h1>
                        <p className="mt-4 text-muted-foreground max-w-xl text-lg">
                            To obtain a challenging position in a reputable organization where I can utilize my skills and knowledge to contribute to the company's success while continuously learning and growing professionally.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <a href="#contact">Contact Me</a>
                            </Button>
                            <Button size="lg" variant="secondary" asChild>
                                <a href="/aadarsh_resume.pdf" download><Download className="mr-2 h-4 w-4" /> Download Resume</a>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center fade-in-up" style={{transitionDelay: '150ms'}}>
                        <Image
                            src="/aadarsh.png"
                            alt="Aadarsh Kumar Dubey"
                            width={400}
                            height={400}
                            className="rounded-full shadow-2xl aspect-square object-cover"
                            data-ai-hint="professional headshot"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section id="education" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title fade-in-up">Education</h2>
            <div className="mt-12 max-w-4xl mx-auto relative">
              <div className="absolute top-0 h-full w-0.5 bg-accent/30 left-1/2 -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
              <div className="absolute top-0 h-full w-0.5 bg-accent/30 left-3 md:hidden" aria-hidden="true"></div>
              <div className="space-y-10 md:space-y-0">
                {educationData.map((edu, index) => (
                  <div key={index} className="relative md:grid md:grid-cols-2 md:gap-x-8 md:items-center">
                    <div className={cn(
                      "md:col-start-1 md:row-start-1",
                      index % 2 !== 0 ? "md:col-start-2" : ""
                    )}>
                      <div className={cn(
                          "relative p-4 rounded-lg border bg-card text-card-foreground shadow-sm ml-10 md:ml-0 fade-in-up",
                          index % 2 !== 0 ? "md:ml-auto" : ""
                      )}>
                         <div className="absolute top-5 -left-12 md:left-auto md:-right-6 transform md:translate-x-1/2">
                           <span className="flex items-center justify-center w-8 h-8 bg-accent rounded-full ring-8 ring-secondary">
                             <GraduationCap className="w-4 h-4 text-accent-foreground" />
                           </span>
                         </div>
                        <h3 className="font-headline text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="mt-2">{edu.detail}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "flex items-center justify-start md:justify-end my-2 ml-10 md:ml-0",
                      "md:col-start-1 md:row-start-1",
                      index % 2 === 0 ? "md:col-start-2" : "md:justify-start"
                    )}>
                       <time className="text-sm font-medium mx-3 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{edu.year}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title fade-in-up">Certifications</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {certificationsData.map((cert, index) => (
                <Card key={index} className="fade-in-up" style={{transitionDelay: `${index * 100}ms`}}>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <cert.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-headline">{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title fade-in-up">Projects</h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              {projectsData.map((project, index) => (
                <Card key={index} className="flex flex-col fade-in-up" style={{transitionDelay: `${index * 100}ms`}}>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="section-title fade-in-up">Skills & More</h2>
                    <div className="mt-12 space-y-12">
                        <div className="fade-in-up" style={{transitionDelay: '100ms'}}>
                            <h3 className="font-headline text-2xl font-semibold text-center mb-6">Technical Skills</h3>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {technicalSkills.map(skill => <Badge key={skill} variant="secondary" className="text-base px-4 py-2">{skill}</Badge>)}
                            </div>
                        </div>
                        <div className="fade-in-up" style={{transitionDelay: '200ms'}}>
                            <h3 className="font-headline text-2xl font-semibold text-center mb-6">Soft Skills</h3>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {softSkills.map(skill => <Badge key={skill} className="text-base px-4 py-2">{skill}</Badge>)}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 pt-4 text-left">
                            <div className="fade-in-up" style={{transitionDelay: '300ms'}}>
                                <h3 className="font-headline text-xl font-semibold">Achievements & Activities</h3>
                                <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                                    {achievementsData.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="fade-in-up" style={{transitionDelay: '400ms'}}>
                                <h3 className="font-headline text-xl font-semibold">Hobbies</h3>
                                <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                                    {hobbiesData.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title fade-in-up">Contact Me</h2>
            <p className="section-subtitle fade-in-up" style={{transitionDelay: '100ms'}}>Feel free to reach out. I'm always open to discussing new projects or opportunities.</p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-lg fade-in-up" style={{transitionDelay: '200ms'}}>
                <a href="tel:+918540867913" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone className="w-5 h-5"/>
                    <span>(+91) 8540867913</span>
                </a>
                <a href="mailto:aadarsh7310@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5"/>
                    <span>aadarsh7310@gmail.com</span>
                </a>
            </div>
            <div className="mt-8 flex justify-center gap-4 fade-in-up" style={{transitionDelay: '300ms'}}>
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Aadarsh Kumar Dubey. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

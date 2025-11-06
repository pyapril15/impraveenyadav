// src/components/PortfolioRibbon.tsx

import { usePersonalInfo, useProjects, useSkills } from '@/hooks/usePortfolioData';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const PortfolioRibbon = () => {
    const { data: personalInfo } = usePersonalInfo();
    const { data: projects } = useProjects();
    const { data: skills } = useSkills();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Generate dynamic text messages
    const generateMessages = () => {
        const messages: string[] = [];

        if (personalInfo) {
            messages.push(`Portfolio of ${personalInfo.name} • ${personalInfo.role}`);
            messages.push(`${personalInfo.name} • Let's build something amazing together`);
        }

        if (projects && projects.length > 0) {
            messages.push(`${projects.length}+ Projects Completed • Turning Ideas Into Reality`);
            projects.slice(0, 3).forEach((project) => {
                messages.push(`Built ${project.name} • ${project.technologies?.slice(0, 3).join(', ') || 'Innovative Solution'}`);
            });
        }

        if (skills && skills.length > 0) {
            messages.push(`${skills.length}+ Skills Mastered • Expertise in ${skills.slice(0, 3).map(s => s.name).join(', ')}`);
            const topSkills = skills.slice(0, 5).map(s => s.name).join(' • ');
            messages.push(`Specialized in: ${topSkills}`);
        }

        return messages.length > 0 ? messages : ['Welcome to my Portfolio • Explore my work'];
    };

    const messages = generateMessages();

    // Typing effect logic
    useEffect(() => {
        const currentMessage = messages[currentIndex];
        const typingSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && displayText === currentMessage) {
            const timeout = setTimeout(() => setIsDeleting(true), 2000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % messages.length);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayText(prev => {
                if (isDeleting) {
                    return currentMessage.substring(0, prev.length - 1);
                }
                return currentMessage.substring(0, prev.length + 1);
            });
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, messages]);

    // Highlighting specific keywords in the text
    const highlightText = (text: string) => {
        const keywords = [
            personalInfo?.name,
            personalInfo?.role,
            ...((projects || []).map(p => p.name)),
            ...((skills || []).slice(0, 5).map(s => s.name)),
            'Projects',
            'Skills',
            'Contact',
            'Portfolio'
        ].filter(Boolean);

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        keywords.forEach(keyword => {
            if (keyword) {
                const regex = new RegExp(`(${keyword})`, 'gi');
                const match = regex.exec(text.slice(lastIndex));

                if (match && match.index !== -1) {
                    const actualIndex = lastIndex + match.index;

                    if (actualIndex > lastIndex) {
                        parts.push(
                            <span key={`text-${lastIndex}`} className="text-muted-foreground">
                                {text.slice(lastIndex, actualIndex)}
                            </span>
                        );
                    }

                    parts.push(
                        <span key={`keyword-${actualIndex}`} className="text-primary font-semibold animate-pulse-glow">
                            {match[0]}
                        </span>
                    );

                    lastIndex = actualIndex + match[0].length;
                }
            }
        });

        if (lastIndex < text.length) {
            parts.push(
                <span key={`text-${lastIndex}`} className="text-muted-foreground">
                    {text.slice(lastIndex)}
                </span>
            );
        }

        return parts.length > 0 ? parts : <span className="text-muted-foreground">{text}</span>;
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-gradient-to-r from-background/95 via-primary/10 to-background/95 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 shadow-lg shadow-primary/10">
                <div className="font-mono text-sm sm:text-base whitespace-nowrap">
                    {highlightText(displayText)}
                    <span className="inline-block w-0.5 h-4 sm:h-5 bg-primary ml-1 animate-blink" />
                </div>
            </div>
        </div>
    );
};

export default PortfolioRibbon;

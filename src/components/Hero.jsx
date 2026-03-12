import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import InteractiveHoverButton from './InteractiveHoverButton';
import { prefetchProjectsRoute } from '../lib/routePrefetch';
import './Hero.css';

const PixelBlast = lazy(() => import('./PixelBlast'));

const Hero = () => {
    const scrollToContact = () => {
        const section = document.getElementById('contact');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleProjectsIntent = () => {
        prefetchProjectsRoute().catch(() => {});
    };

    return (
        <section className="hero" id="home">
            <div className="container hero-container">
                <div className="hero-content">
                    <h2 className="hero-subtitle">Visual Designer & Art Director</h2>
                    <h1 className="hero-title">
                        Crafting Digital
                        <span className="text-accent"> Experiences.</span>
                    </h1>
                    <p className="hero-description">
                        Hi, I’m a passionate graphic designer creating beautiful, functional, and minimal brand identities and digital experiences.
                    </p>
                    <div className="hero-cta">
                        <InteractiveHoverButton
                            as={Link}
                            to="/projects"
                            onMouseEnter={handleProjectsIntent}
                            onFocus={handleProjectsIntent}
                            onTouchStart={handleProjectsIntent}
                        >
                            View Projects
                        </InteractiveHoverButton>
                        <button type="button" onClick={scrollToContact} className="btn-secondary">
                            Contact Me
                        </button>
                    </div>
                </div>

                {/* Decorative elements for dynamic feel */}
                <div className="hero-visual">
                    <Suspense fallback={<div className="hero-visual-fallback" aria-hidden="true" />}>
                        <PixelBlast
                            variant="square"
                            pixelSize={4}
                            color="#d4ff36"
                            patternScale={2}
                            patternDensity={1}
                            pixelSizeJitter={0}
                            enableRipples={true}
                            rippleSpeed={0.4}
                            rippleThickness={0.12}
                            rippleIntensityScale={1.5}
                            liquid={false}
                            liquidStrength={0.12}
                            liquidRadius={1.2}
                            liquidWobbleSpeed={5}
                            speed={0.5}
                            edgeFade={0.25}
                            transparent={true}
                        />
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default Hero;

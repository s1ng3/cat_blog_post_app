import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css';

import Singe from './assets/singe.jpg';
import Herzal from './assets/herzal.jpg';
import Coro from './assets/coro.jpg';
import Denes from './assets/denes.jpg';


function About() {

  const teamMembers = [
    {
      name: 'Herzal Radu',
      role: 'Lead Marketing Manager',
      description: 'Hello, I am Radu and I like to code and data transmissions.',
      image: Herzal,
      instagram: 'https://www.instagram.com/raduherzal/'

    },
    {
      name: 'Sîngerean Tudor',
      role: 'Backend Developer',
      description: 'Hello I am Tudor and I like gym and I also like to code.',
      image: Singe,
      instagram: 'https://www.instagram.com/tudor.singerean/'
    },
    {
      name: 'Coroian Denisa',
      role: 'Full Stack Developer',
      description: 'Hello, I am Denisa and I like cats. I also like to cook.',
      image: Coro,
      instagram: 'https://www.instagram.com/cdenisa/'

    },
    {
      name: 'Denes Tamas',
      role: 'Database Administrator',
      description: 'Hello, I am Tamas and I like to play video games and read books.',
      image: Denes,
      instagram: 'https://www.instagram.com/denesatti/'
    },
  ];

  return (
      <div className="about">
        <h1>About Our Team</h1>
        <p className='about_paragraph skin-colored-container'>We are a team of passionate developers who collaborated on building a full-stack blog application using the MERN stack so you can share your cats with everyone :) !</p>
        <div className="team">
          {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <img src={member.image} alt={`${member.name}`} className="member-image"/>
                </a>
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <p>{member.description}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default About
import { useState, useEffect } from "react";
import { fetchData } from "../services/nameService";
import "./Resume.css";


const mockData = {
  title: "Senior Software Engineer",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
  summary:
    "Results-driven software engineer with 7+ years of experience building scalable web applications and cloud-native systems. Passionate about clean architecture, developer experience, and delivering high-impact products.",
  experience: [
    {
      company: "Acme Corp",
      role: "Senior Software Engineer",
      period: "Jan 2022 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Led migration of monolithic backend to microservices, reducing deployment time by 60%.",
        "Architected a real-time event pipeline processing 500k events/day using GCP Pub/Sub and Cloud Run.",
        "Mentored 4 junior engineers and drove adoption of team coding standards.",
      ],
    },
    {
      company: "TechStart Inc.",
      role: "Software Engineer",
      period: "Mar 2019 – Dec 2021",
      location: "Austin, TX",
      bullets: [
        "Built RESTful APIs serving 2M+ daily requests with Node.js and PostgreSQL.",
        "Developed React dashboards that reduced customer support tickets by 30%.",
        "Implemented CI/CD pipelines with GitHub Actions and automated test coverage to 85%.",
      ],
    },
    {
      company: "DevHouse Agency",
      role: "Junior Developer",
      period: "Jun 2017 – Feb 2019",
      location: "Remote",
      bullets: [
        "Delivered 10+ client web projects using React, Vue, and vanilla JS.",
        "Integrated third-party APIs (Stripe, Twilio, Google Maps) for e-commerce clients.",
      ],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      period: "2013 – 2017",
      detail: "GPA: 3.8 / 4.0 — Dean's List",
    },
  ],
  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "Go"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
    "Backend & Cloud": ["Node.js", "GCP", "Firebase", "Docker", "Kubernetes"],
    Databases: ["PostgreSQL", "MongoDB", "Redis", "BigQuery"],
    Tools: ["Git", "GitHub Actions", "Terraform", "Grafana"],
  },
  certifications: [
    "Google Cloud Professional Cloud Architect (2023)",
    "AWS Certified Solutions Architect – Associate (2021)",
  ],
};

export default function Resume() {
  const [name, setName] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data,setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then(json => {
        setData(json);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="resume">
      <header className="resume-header">

        {/*Profile Pic */}
        <div className="resume-header-pic">
          {loading && <span className="pic-skeleton" />}
          {error && <img src="" alt="" />}
          {data && <img src={data.profilepic} alt={data.name} />}
        </div>

        <div className="resume-header-info">

          {/*Name*/}
          <div className="resume-header-name">
            {loading && <span className="name-skeleton" />}
            {error && <span className="name-error" title={error}>Name unavailable</span>}
            {data && <h1>{data.name}</h1>}
          </div>

          {/* Title */}
          {loading && <span className="title-skeleton" />}
          {error && <p className="data-error" title={error}>Title unavailable</p>}
          {data && <p>{data.title}</p>}

          <div className="resume-contact">
              {/* Email */}
              {loading && <span className="data-skeleton" />}
              {error && <span className="data-error" title={error}>Email unavailable</span>}
              {data && <span>{data.email}</span>}

              {/* Phone */}
              {loading && <span className="data-skeleton" />}
              {error && <span className="data-error" title={error}>Phone unavailable</span>}
              {data && <span>{data.phone}</span>}

              {/* Location */}
              {loading && <span className="data-skeleton" />}
              {error && <span className="data-error" title={error}>Location unavailable</span>}
              {data && <span>{data.location}</span>}

              {/* Linkedin URL */}
              {loading && <span className="data-skeleton" />}
              {error && <span className="data-error" title={error}>Linkedin unavailable</span>}
              {data && <span>{data.linkedin}</span>}

              {/* Github URL */}
              {loading && <span className="data-skeleton" />}
              {error && <span className="data-error" title={error}>Github unavailable</span>}
              {data && <span>{data.github}</span>}

          </div>
        </div>
      </header>

      <Section title="Summary">
        <p className="summary-text">{mockData.summary}</p>
      </Section>

      <Section title="Experience">
        {mockData.experience.map((job) => (
          <div className="entry" key={job.company}>
            <div className="entry-header">
              <div>
                <span className="entry-title">{job.role}</span>
                <span className="entry-company"> · {job.company}</span>
              </div>
              <span className="entry-meta">{job.period} · {job.location}</span>
            </div>
            <ul>
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {mockData.education.map((edu) => (
          <div className="entry" key={edu.institution}>
            <div className="entry-header">
              <div>
                <span className="entry-title">{edu.degree}</span>
                <span className="entry-company"> · {edu.institution}</span>
              </div>
              <span className="entry-meta">{edu.period}</span>
            </div>
            <p className="entry-detail">{edu.detail}</p>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <div className="skills-grid">
          {Object.entries(mockData.skills).map(([category, items]) => (
            <div className="skill-group" key={category}>
              <span className="skill-category">{category}</span>
              <div className="skill-tags">
                {items.map((s) => (
                  <span className="skill-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Certifications">
        <ul className="cert-list">
          {mockData.certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="resume-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

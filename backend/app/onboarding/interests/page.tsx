"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

// ─── Branch → Interest mapping ─────────────────────────────────────────────
type InterestItem = { id: string; title: string; description: string };

const BRANCH_INTERESTS: Record<string, InterestItem[]> = {
  // Core CS
  CSC: [
    { id: "dsa", title: "🧩 Data Structures & Algorithms", description: "Master DSA for top-tier placements and competitive programming." },
    { id: "web", title: "🌐 Full-Stack Web Development", description: "Build modern web apps with React, Node.js & databases." },
    { id: "os", title: "⚙️ Operating Systems & Systems Programming", description: "Dive into processes, memory management and kernel concepts." },
    { id: "dbms", title: "🗄️ Databases & SQL Mastery", description: "Design, query, and optimize relational & NoSQL databases." },
    { id: "cn", title: "🌐 Computer Networks & Protocols", description: "Understand TCP/IP, routing, and distributed systems." },
    { id: "cloud", title: "☁️ Cloud & DevOps (AWS / GCP / Azure)", description: "Deploy apps, automate CI/CD, and manage cloud infra." },
    { id: "cyber", title: "🔐 Cybersecurity & Ethical Hacking", description: "Penetration testing, OWASP, and system hardening." },
    { id: "cp", title: "🏆 Competitive Programming", description: "Crack ICPC, Codeforces, and placement coding rounds." },
  ],
  IT: [
    { id: "web", title: "🌐 Web Development", description: "Frontend, backend, and full-stack application development." },
    { id: "cloud", title: "☁️ Cloud Computing & DevOps", description: "AWS, GCP, Docker, Kubernetes, and CI/CD pipelines." },
    { id: "dbms", title: "🗄️ Database Administration", description: "MySQL, PostgreSQL, MongoDB and query optimization." },
    { id: "net", title: "🔌 Networking & Infrastructure", description: "LAN/WAN, routing protocols, and network security." },
    { id: "cyber", title: "🔐 IT Security & Compliance", description: "Risk management, ISO 27001, and enterprise security." },
    { id: "dsa", title: "🧩 DSA & Placement Prep", description: "Core algorithms and data structures for tech interviews." },
    { id: "app", title: "📱 Mobile App Development", description: "Build cross-platform apps with React Native or Flutter." },
  ],
  SE: [
    { id: "swe", title: "🛠️ Software Engineering Principles", description: "SDLC, design patterns, SOLID principles, and clean code." },
    { id: "agile", title: "🔄 Agile & Scrum Methodology", description: "Sprint planning, Jira workflows, and team collaboration." },
    { id: "test", title: "🧪 Testing & QA Engineering", description: "Unit, integration, and E2E testing with Jest, Selenium." },
    { id: "web", title: "🌐 Full-Stack Development", description: "Build production-grade web applications end-to-end." },
    { id: "cloud", title: "☁️ DevOps & Cloud Deployment", description: "CI/CD, containerization, and cloud-native deployment." },
    { id: "arch", title: "🏗️ System Design & Architecture", description: "Microservices, scalability, and distributed systems design." },
    { id: "dsa", title: "🧩 DSA & Interview Prep", description: "Algorithm design and problem-solving for big tech interviews." },
  ],
  IS: [
    { id: "dsa", title: "🧩 DSA & Problem Solving", description: "Algorithms, data structures, and competitive coding." },
    { id: "dbms", title: "🗄️ Database & Information Systems", description: "Relational modeling, SQL, and data warehousing." },
    { id: "web", title: "🌐 Web & Enterprise Apps", description: "Build scalable web applications and enterprise software." },
    { id: "cloud", title: "☁️ Cloud & System Administration", description: "Manage cloud resources, storage, and availability." },
    { id: "bi", title: "📊 Business Intelligence & Analytics", description: "Power BI, Tableau, and data-driven decision making." },
    { id: "cyber", title: "🔐 Information Security", description: "Data protection, encryption, and threat analysis." },
  ],

  // AI & ML
  AIML: [
    { id: "ml", title: "🤖 Machine Learning (Classical)", description: "Regression, classification, clustering, and model evaluation." },
    { id: "dl", title: "🧠 Deep Learning & Neural Networks", description: "CNNs, RNNs, Transformers, and PyTorch / TensorFlow." },
    { id: "nlp", title: "📝 Natural Language Processing", description: "Text classification, LLMs, RAG, and sentiment analysis." },
    { id: "cv", title: "👁️ Computer Vision", description: "Object detection, image segmentation, and YOLO models." },
    { id: "mlops", title: "🚀 MLOps & AI Deployment", description: "Serving models, Docker, MLflow, and Kubernetes." },
    { id: "data", title: "📊 Data Science & EDA", description: "Exploratory data analysis, pandas, and visualization." },
    { id: "rl", title: "🎮 Reinforcement Learning", description: "Agents, policies, Q-learning, and OpenAI Gym." },
    { id: "gen", title: "✨ Generative AI & LLMs", description: "Prompt engineering, fine-tuning, and building AI apps." },
  ],
  CAI: [
    { id: "ml", title: "🤖 Machine Learning Fundamentals", description: "Supervised & unsupervised learning with scikit-learn." },
    { id: "dl", title: "🧠 Deep Learning", description: "Neural networks, CNNs, RNNs, and modern architectures." },
    { id: "gen", title: "✨ Generative AI & Prompt Engineering", description: "LLMs, ChatGPT API, and Langchain applications." },
    { id: "dsa", title: "🧩 DSA & AI Algorithms", description: "Search algorithms, graph AI, and heuristics." },
    { id: "cv", title: "👁️ Computer Vision", description: "Image processing, feature extraction, and detection models." },
    { id: "web", title: "🌐 AI-Powered Web Apps", description: "Build intelligent web apps integrating ML/AI backends." },
  ],
  CSM: [
    { id: "ml", title: "🤖 Machine Learning", description: "Classical ML algorithms and model selection strategies." },
    { id: "dl", title: "🧠 Deep Learning", description: "Neural architectures and GPU-based model training." },
    { id: "dsa", title: "🧩 DSA & Optimization", description: "Algorithm efficiency critical for ML model performance." },
    { id: "data", title: "📊 Data Science Pipeline", description: "Data cleaning, feature engineering, and EDA with pandas." },
    { id: "mlops", title: "🚀 MLOps & Model Serving", description: "Production deployment with Docker, FastAPI, and cloud." },
    { id: "nlp", title: "📝 NLP & Text Mining", description: "Text preprocessing, embeddings, and transformer models." },
  ],
  AIE: [
    { id: "ml", title: "🤖 AI & Machine Learning", description: "Core ML theory and engineering-grade implementation." },
    { id: "emb", title: "⚡ Embedded AI (Edge ML)", description: "Running inference on microcontrollers and Raspberry Pi." },
    { id: "cv", title: "👁️ Computer Vision", description: "Real-time object detection and image processing pipelines." },
    { id: "dl", title: "🧠 Deep Learning", description: "Training, evaluation, and deploying neural networks." },
    { id: "iot", title: "📡 IoT + AI Integration", description: "Smart sensor fusion and edge computing with AI." },
    { id: "ros", title: "🤖 Robotics & AI", description: "ROS2, autonomous navigation, and reinforcement learning." },
  ],
  DL: [
    { id: "dl", title: "🧠 Deep Learning Architectures", description: "CNNs, RNNs, Transformers, Attention, and beyond." },
    { id: "gen", title: "✨ Generative Models (GANs, VAEs, Diffusion)", description: "Image, audio, and video synthesis techniques." },
    { id: "nlp", title: "📝 NLP & Large Language Models", description: "BERT, GPT, T5, fine-tuning, and RAG pipelines." },
    { id: "cv", title: "👁️ Computer Vision at Scale", description: "Detection, segmentation, and 3D scene understanding." },
    { id: "rl", title: "🎮 Reinforcement Learning", description: "Deep Q-networks, policy gradients, and PPO." },
    { id: "mlops", title: "🚀 MLOps & Model Lifecycle", description: "Training infra, experiment tracking, and serving." },
  ],

  // Data Science
  AID: [
    { id: "data", title: "📊 Data Science & Analytics", description: "Pandas, NumPy, EDA, and statistical reasoning." },
    { id: "ml", title: "🤖 Machine Learning", description: "Model building, evaluation, and feature engineering." },
    { id: "viz", title: "📈 Data Visualization", description: "Matplotlib, Seaborn, Plotly, and dashboard tools." },
    { id: "sql", title: "🗄️ SQL & Big Data", description: "Complex queries, Spark, and data warehouse concepts." },
    { id: "dl", title: "🧠 Deep Learning for Data", description: "Apply neural networks to tabular, text, and image data." },
    { id: "gen", title: "✨ Generative AI & LLMs", description: "LLM APIs, RAG, and AI-powered analytics." },
  ],
  CSD: [
    { id: "dsa", title: "🧩 DSA & Algorithmic Thinking", description: "Problem solving and computer science fundamentals." },
    { id: "data", title: "📊 Data Science Pipeline", description: "EDA, feature engineering, and predictive modeling." },
    { id: "ml", title: "🤖 Machine Learning", description: "Supervised learning, model tuning, and validation." },
    { id: "sql", title: "🗄️ SQL & Databases", description: "Query optimization, joins, and analytical SQL." },
    { id: "cloud", title: "☁️ Cloud Data Platforms", description: "BigQuery, Databricks, and cloud-native data stacks." },
    { id: "viz", title: "📈 Analytics & Visualization", description: "Tableau, Power BI, and storytelling with data." },
  ],
  DS: [
    { id: "data", title: "📊 Applied Data Science", description: "End-to-end data pipelines and real-world analytics." },
    { id: "ml", title: "🤖 Machine Learning Engineering", description: "Build, train, and deploy production ML models." },
    { id: "sql", title: "🗄️ SQL & Data Warehousing", description: "Analytical SQL, ETL pipelines, and star schema design." },
    { id: "viz", title: "📈 Data Visualization & BI", description: "Create dashboards with Tableau, Power BI, and Plotly." },
    { id: "cloud", title: "☁️ Cloud Data Engineering", description: "AWS S3, GCP BigQuery, and distributed data pipelines." },
    { id: "stats", title: "📐 Statistics & Probability", description: "Hypothesis testing, distributions, and inferential stats." },
  ],
  BD: [
    { id: "spark", title: "⚡ Apache Spark & Hadoop", description: "Big data processing at scale with distributed computing." },
    { id: "sql", title: "🗄️ SQL & NoSQL Databases", description: "Hive, HBase, Cassandra, and MongoDB for large datasets." },
    { id: "cloud", title: "☁️ Cloud Data Platforms", description: "AWS EMR, GCP Dataflow, and Databricks." },
    { id: "stream", title: "🔄 Real-time Data Streaming", description: "Apache Kafka, Flink, and event-driven architectures." },
    { id: "data", title: "📊 Data Science & Analytics", description: "Large-scale EDA, ML on big data, and feature stores." },
    { id: "viz", title: "📈 Analytics Dashboards", description: "Real-time BI dashboards and data storytelling." },
  ],
  BA: [
    { id: "sql", title: "🗄️ SQL & Data Analysis", description: "Querying, data modeling, and business reporting." },
    { id: "viz", title: "📈 Business Intelligence Tools", description: "Power BI, Tableau, Looker — interactive dashboards." },
    { id: "data", title: "📊 Data Science for Business", description: "Predictive analytics and KPI-driven decision making." },
    { id: "stats", title: "📐 Statistics & Forecasting", description: "Time series, regression, and demand forecasting." },
    { id: "ml", title: "🤖 ML for Business Problems", description: "Churn prediction, recommenders, and anomaly detection." },
    { id: "excel", title: "📋 Advanced Excel & Automation", description: "Power Query, VBA macros, and Excel-based reporting." },
  ],

  // Cyber Security
  CSY: [
    { id: "cyber", title: "🔐 Ethical Hacking & Penetration Testing", description: "Kali Linux, Metasploit, Nmap, and OWASP methodology." },
    { id: "net", title: "🌐 Network Security & Forensics", description: "Packet analysis, IDS/IPS, and incident response." },
    { id: "web", title: "🕸️ Web Application Security", description: "OWASP Top 10, Burp Suite, and API security testing." },
    { id: "malware", title: "🦠 Malware Analysis & Reverse Engineering", description: "Static/dynamic analysis, IDA Pro, and sandboxing." },
    { id: "cloud_sec", title: "☁️ Cloud Security", description: "IAM, VPC security, compliance, and CSPM tools." },
    { id: "crypt", title: "🔒 Cryptography & PKI", description: "AES, RSA, TLS, and certificate management." },
  ],
  IS_CS: [
    { id: "cyber", title: "🔐 Information Security Management", description: "ISO 27001, NIST frameworks, and risk assessment." },
    { id: "net", title: "🌐 Network Defense & Monitoring", description: "SIEM, SOC operations, and threat intelligence." },
    { id: "crypt", title: "🔒 Cryptography", description: "Encryption algorithms, key management, and PKI." },
    { id: "compliance", title: "📋 GRC & Compliance", description: "GDPR, HIPAA, SOC 2, and audit frameworks." },
    { id: "malware", title: "🦠 Threat Hunting & IR", description: "Incident response, forensics, and threat detection." },
  ],
  NET: [
    { id: "net", title: "🌐 Computer Networking Protocols", description: "TCP/IP, BGP, OSPF, and advanced routing & switching." },
    { id: "cyber", title: "🔐 Network Security", description: "Firewalls, VPN, zero-trust, and network hardening." },
    { id: "cloud", title: "☁️ Cloud Networking", description: "VPC, CDN, load balancers, and hybrid cloud setups." },
    { id: "sdn", title: "🔌 Software Defined Networking", description: "OpenFlow, NFV, and programmable network infrastructure." },
    { id: "wireless", title: "📡 Wireless & 5G Networks", description: "Wi-Fi protocols, 5G architecture, and spectrum management." },
  ],
  FD: [
    { id: "forensics", title: "🔍 Digital Forensics & Evidence", description: "Disk imaging, file carving, and chain-of-custody." },
    { id: "malware", title: "🦠 Malware Analysis", description: "Reverse engineering malicious code and behavioral analysis." },
    { id: "net", title: "🌐 Network Forensics", description: "Packet capture analysis and network incident reconstruction." },
    { id: "osint", title: "🕵️ OSINT & Threat Intelligence", description: "Open-source intelligence gathering and attribution." },
    { id: "cyber", title: "🔐 Ethical Hacking", description: "Offensive security skills for defensive understanding." },
  ],

  // Cloud & DevOps
  CLD: [
    { id: "cloud", title: "☁️ AWS / GCP / Azure Fundamentals", description: "Core cloud services, pricing, and architecture patterns." },
    { id: "devops", title: "🔄 DevOps & CI/CD Pipelines", description: "GitHub Actions, Jenkins, and automated deployment." },
    { id: "docker", title: "🐳 Docker & Kubernetes", description: "Containerization, orchestration, and Helm charts." },
    { id: "iac", title: "📜 Infrastructure as Code (Terraform)", description: "Declarative cloud resource provisioning and management." },
    { id: "monitor", title: "📊 Observability & Monitoring", description: "Prometheus, Grafana, ELK stack, and SRE principles." },
    { id: "net", title: "🌐 Cloud Networking", description: "VPC, CDN, DNS, load balancers, and network security." },
  ],
  CS_CLD: [
    { id: "dsa", title: "🧩 DSA & Software Fundamentals", description: "Core CS skills for building scalable cloud applications." },
    { id: "cloud", title: "☁️ Cloud Platforms & Services", description: "Compute, storage, and managed services on major clouds." },
    { id: "devops", title: "🔄 DevOps & Automation", description: "Pipelines, scripting, and infrastructure automation." },
    { id: "docker", title: "🐳 Containers & Microservices", description: "Docker, Kubernetes, and service mesh architectures." },
    { id: "web", title: "🌐 Cloud-Native App Development", description: "Serverless, event-driven, and 12-factor app design." },
  ],
  SYS: [
    { id: "os", title: "⚙️ Systems & OS Internals", description: "Linux kernel, process scheduling, and memory management." },
    { id: "devops", title: "🔄 Site Reliability Engineering", description: "SLOs, error budgets, on-call, and reliability patterns." },
    { id: "cloud", title: "☁️ Cloud Infrastructure", description: "Multi-region deployments, HA, and disaster recovery." },
    { id: "net", title: "🌐 Network Engineering", description: "Load balancing, routing, and network performance tuning." },
    { id: "iac", title: "📜 Terraform & Ansible", description: "Automate provisioning and configuration management." },
  ],

  // IoT & Embedded
  IOT: [
    { id: "iot", title: "📡 IoT Architecture & Protocols", description: "MQTT, CoAP, HTTP, and edge computing patterns." },
    { id: "emb", title: "⚡ Embedded Systems & Microcontrollers", description: "Arduino, ESP32, STM32, and bare-metal programming." },
    { id: "cloud", title: "☁️ IoT Cloud Platforms", description: "AWS IoT Core, Azure IoT Hub, and Google Cloud IoT." },
    { id: "ml", title: "🤖 Edge AI & TinyML", description: "Run ML models on resource-constrained IoT devices." },
    { id: "net", title: "🌐 Wireless Protocols", description: "Bluetooth, Zigbee, LoRa, and 5G for IoT connectivity." },
    { id: "security", title: "🔐 IoT Security", description: "Device authentication, OTA updates, and secure boot." },
  ],
  ECE: [
    { id: "emb", title: "⚡ Embedded C & Microcontrollers", description: "ARM Cortex, AVR, and RTOS-based firmware development." },
    { id: "vlsi", title: "🔬 VLSI & Digital Circuit Design", description: "VHDL, Verilog, and FPGA-based digital systems." },
    { id: "signal", title: "📶 Signal Processing & DSP", description: "FFT, filters, and real-time signal analysis." },
    { id: "iot", title: "📡 IoT & Communication Systems", description: "Wireless protocols, antenna design, and RF engineering." },
    { id: "ml", title: "🤖 AI for Hardware Systems", description: "Applying ML to communication and signal problems." },
    { id: "pcb", title: "🖥️ PCB Design & Hardware Prototyping", description: "KiCad, Altium, and designing production-ready PCBs." },
  ],
  EEE: [
    { id: "power", title: "⚡ Power Electronics & Drives", description: "Inverters, converters, and motor control systems." },
    { id: "emb", title: "⚙️ Embedded Systems & PLC", description: "Industrial control with PLCs, SCADA, and embedded C." },
    { id: "signal", title: "📶 Signal Processing", description: "DSP, Fourier analysis, and control system design." },
    { id: "iot", title: "📡 Smart Grid & IoT", description: "Energy management, smart metering, and grid automation." },
    { id: "ml", title: "🤖 AI in Power Systems", description: "Fault detection, load forecasting, and energy optimization." },
    { id: "renewable", title: "🌱 Renewable Energy Systems", description: "Solar, wind, and energy storage system design." },
  ],
  EMB: [
    { id: "emb", title: "⚡ Embedded C & Assembly", description: "Low-level firmware, memory-mapped I/O, and bootloaders." },
    { id: "vlsi", title: "🔬 VLSI & FPGA Design", description: "Hardware description with Verilog/VHDL and Xilinx tools." },
    { id: "rtos", title: "🔄 RTOS & Real-Time Systems", description: "FreeRTOS, Zephyr, and deterministic scheduling." },
    { id: "pcb", title: "🖥️ PCB & Hardware Design", description: "Schematic capture, layout, and hardware bring-up." },
    { id: "iot", title: "📡 IoT Integration", description: "Connect embedded devices to cloud IoT platforms." },
    { id: "ml", title: "🤖 TinyML & Edge AI", description: "Deploy ML models on microcontrollers with TFLite Micro." },
  ],

  // Robotics & Automation
  RAI: [
    { id: "ros", title: "🤖 ROS2 & Robot Programming", description: "Nodes, topics, services, and robot middleware." },
    { id: "ml", title: "🤖 AI & Robotics Intelligence", description: "Perception, planning, and robot decision making." },
    { id: "cv", title: "👁️ Computer Vision for Robots", description: "SLAM, object detection, and 3D perception." },
    { id: "emb", title: "⚡ Embedded Robotics", description: "Motor control, sensors, and real-time actuation." },
    { id: "rl", title: "🎮 Reinforcement Learning for Robots", description: "Train robots in simulation and transfer to hardware." },
    { id: "sim", title: "🌐 Robot Simulation (Gazebo/IsaacSim)", description: "Simulate robots before deploying to real hardware." },
  ],
  RAE: [
    { id: "auto", title: "🏭 Industrial Automation & PLC", description: "Ladder logic, SCADA, and factory automation systems." },
    { id: "ros", title: "🤖 Robotics Programming (ROS2)", description: "Program collaborative and industrial robot arms." },
    { id: "emb", title: "⚡ Embedded Control Systems", description: "Motor drivers, servo control, and real-time firmware." },
    { id: "cv", title: "👁️ Machine Vision", description: "Quality inspection, pick-and-place, and visual guidance." },
    { id: "ml", title: "🤖 AI in Manufacturing", description: "Predictive maintenance and defect detection with AI." },
  ],
  ME_AI: [
    { id: "ml", title: "🤖 AI & Machine Learning", description: "Apply AI to mechanical design and manufacturing problems." },
    { id: "cad", title: "🖊️ CAD & Simulation (FEA/CFD)", description: "SolidWorks, ANSYS, and computational analysis." },
    { id: "iot", title: "📡 Industrial IoT & Smart Manufacturing", description: "Sensor integration and real-time monitoring." },
    { id: "cv", title: "👁️ Computer Vision for Inspection", description: "AI-powered defect detection on production lines." },
    { id: "emb", title: "⚡ Embedded & Control Systems", description: "PID control, actuators, and mechatronics." },
    { id: "data", title: "📊 Data Analytics for Engineering", description: "Python-based analysis of simulation and test data." },
  ],

  // Computer Applications
  BCA: [
    { id: "web", title: "🌐 Web Development", description: "HTML, CSS, JavaScript, React, and backend with Node.js." },
    { id: "dsa", title: "🧩 DSA & Programming Fundamentals", description: "Core data structures and algorithms in Python/Java." },
    { id: "app", title: "📱 Mobile App Development", description: "Flutter or React Native cross-platform mobile apps." },
    { id: "dbms", title: "🗄️ Database Management", description: "SQL, database design, and application integration." },
    { id: "cloud", title: "☁️ Cloud & Deployment Basics", description: "Host apps on cloud platforms with basic DevOps." },
    { id: "ui", title: "🎨 UI/UX Design", description: "Figma, design systems, and user experience principles." },
  ],
  MCA: [
    { id: "dsa", title: "🧩 DSA & Advanced Programming", description: "Complex algorithms and problem solving for placements." },
    { id: "web", title: "🌐 Full-Stack Development", description: "Enterprise web application development at scale." },
    { id: "cloud", title: "☁️ Cloud & Microservices", description: "Spring Boot, Docker, and cloud-native architectures." },
    { id: "dbms", title: "🗄️ Advanced Databases", description: "Database optimization, NoSQL, and distributed databases." },
    { id: "cyber", title: "🔐 Application Security", description: "Secure coding practices and application penetration testing." },
    { id: "ml", title: "🤖 ML Integration for Apps", description: "Integrating AI/ML models into enterprise applications." },
  ],
  BIT: [
    { id: "web", title: "🌐 Web & IT Application Development", description: "Build web apps with modern frameworks and tools." },
    { id: "net", title: "🌐 Networking & IT Infrastructure", description: "Networking protocols, server admin, and IT ops." },
    { id: "dbms", title: "🗄️ Database Systems", description: "Relational databases, SQL, and data modeling." },
    { id: "cloud", title: "☁️ Cloud Computing", description: "Cloud services for IT professionals and sys admins." },
    { id: "cyber", title: "🔐 IT Security", description: "Cybersecurity fundamentals for IT practitioners." },
    { id: "app", title: "📱 Mobile Development", description: "Android/iOS app development fundamentals." },
  ],
};

// Fallback interests shown when branch is not recognized
const DEFAULT_INTERESTS: InterestItem[] = [
  { id: "web", title: "🌐 Web Development", description: "Build websites and full-stack applications." },
  { id: "app", title: "📱 App Development", description: "Create applications for phones and other devices." },
  { id: "ai", title: "🤖 AI & Machine Learning", description: "Learn AI, machine learning, and intelligent systems." },
  { id: "data", title: "📊 Data Science", description: "Work with data, statistics, and data-driven solutions." },
  { id: "cyber", title: "🔐 Cybersecurity", description: "Learn how to protect systems, networks, and applications." },
  { id: "cloud", title: "☁️ Cloud & DevOps", description: "Learn deployment, cloud platforms, and DevOps." },
  { id: "dsa", title: "🧩 DSA & Competitive Programming", description: "Build strong problem-solving and algorithm skills." },
  { id: "unknown", title: "❓ I don't know which role is right for me", description: "Try short practical tasks to discover what suits you." },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function Interests() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<{ name: string; year: string; branch: string } | null>(null);
  const router = useRouter();

  // Load user profile from Supabase Auth or localStorage
  useEffect(() => {
    // 1. Try Supabase Auth first
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(async ({ data: { user } }) => {
        if (user) {
          const meta = user.user_metadata || {};
          let b = meta.branch || "";
          let y = meta.year || "";
          let n = meta.name || "";

          const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
          if (prof) {
            b = prof.branch || b;
            y = prof.year || y;
            n = prof.name || n;
          }

          if (b || y || n) {
            setUserInfo({ name: n, year: y, branch: b });
            return;
          }
        }
      });
    } catch {
      // ignore
    }

    try {
      // 2. Try auth-based legacy session
      const sessionRaw = localStorage.getItem("campusgrow_session");
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const usersRaw = localStorage.getItem("campusgrow_users");
        if (usersRaw) {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: { id: string }) => u.id === session.userId);
          if (user) {
            setUserInfo({ name: user.name, year: user.year || "", branch: user.branch || "" });
            return;
          }
        }
      }
      // 3. Fallback: legacy onboarding studentData
      const raw = localStorage.getItem("studentData");
      if (raw) {
        const sd = JSON.parse(raw);
        setUserInfo({ name: sd.name || "", year: sd.year || "", branch: sd.branch || "" });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const branchCode = userInfo?.branch ?? "";
  const interests = BRANCH_INTERESTS[branchCode] ?? DEFAULT_INTERESTS;

  const toggleInterest = (id: string) => {
    setSelectedInterests((current) =>
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id]
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length === 0) return;
    const existingData = localStorage.getItem("studentData");
    const studentData = existingData ? JSON.parse(existingData) : {};
    localStorage.setItem("studentData", JSON.stringify({ ...studentData, interests: selectedInterests }));
    router.push("/onboarding/goal");
  };

  // Branch label helper
  const branchLabel = branchCode
    ? Object.entries(BRANCH_INTERESTS).some(([k]) => k === branchCode)
      ? `${branchCode} Branch`
      : branchCode
    : null;

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 flex flex-col">
      {/* Top Header with BrandLogo in Left Side Corner */}
      <header className="border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <BrandLogo subtitle="Grow Beyond the Classroom." className="-ml-1" />
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10 w-full flex-1">

        {/* Progress */}
        <p className="text-sm font-medium text-gray-500">Step 3 of 4</p>
        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-3/4 rounded-full bg-black" />
        </div>

        {/* User Info Banner */}
        {userInfo && (userInfo.name || userInfo.year || userInfo.branch) && (
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700 border border-emerald-200">
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "👤"}
            </div>
            <div className="flex-1 min-w-0">
              {userInfo.name && (
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {userInfo.name}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-1">
                {userInfo.year && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 border border-emerald-200">
                    🎓 {userInfo.year}
                  </span>
                )}
                {branchLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white">
                    🏛️ {branchLabel}
                  </span>
                )}
              </div>
            </div>
            {branchCode && BRANCH_INTERESTS[branchCode] && (
              <span className="text-xs text-emerald-700 font-medium bg-emerald-100 border border-emerald-200 rounded-full px-3 py-1 shrink-0">
                ✨ Curated for your branch
              </span>
            )}
          </div>
        )}

        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-4xl font-bold">
            What are you interested in? 🎯
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {branchCode && BRANCH_INTERESTS[branchCode]
              ? `We've picked the most impactful topics for ${branchLabel ?? "your branch"}. Select all that excite you.`
              : "Choose one or more areas you'd like to explore."}
          </p>
        </div>

        {/* Interests Grid */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {interests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-150 ${
                  isSelected
                    ? "border-black bg-gray-100 shadow-md scale-[1.01]"
                    : "border-gray-200 bg-white hover:border-black hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold leading-snug">{interest.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 leading-snug">{interest.description}</p>
                  </div>
                  <div
                    className={`mt-0.5 shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "border-black bg-black text-white" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selection count */}
        {selectedInterests.length > 0 && (
          <p className="mt-4 text-sm text-emerald-600 font-medium">
            {selectedInterests.length} topic{selectedInterests.length > 1 ? "s" : ""} selected
          </p>
        )}

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={selectedInterests.length === 0}
          className="mt-6 w-full rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue →
        </button>

      </div>
    </main>
  );
}
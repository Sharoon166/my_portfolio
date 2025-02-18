import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { motion } from "motion/react";

export function AboutPreview() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 space-y-8"
    >
      <h2 className="text-primary-foreground">About me</h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="max-w-4xl sm:text-xl md:text-2xl leading-loose"
      >
        I&apos;m a  {new Date().getFullYear() - 2003} y/o Computer Science
        student with a strong foundation in web development and a keen interest
        in building scalable, user-centric applications. Passionate about
        problem-solving and innovation, I continuously explore emerging
        technologies to enhance my skills and stay ahead in the industry.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Link
          href="/about"
          className="inline-flex items-center gap-2 group relative overflow-hidden text-2xl text-destructive hover:underline underline-offset-4 p-3"
        >
          Learn More{" "}
          <LuArrowRight className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
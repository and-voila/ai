import Image from 'next/image';

import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { FadeIn, FadeInStagger } from '@/components/fade-in';

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: '/images/team/leslie-alexander.jpeg' },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: '/images/team/michael-foster.jpeg' },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: '/images/team/dries-vincent.jpeg' },
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: '/images/team/chelsea-hagon.jpeg' },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: '/images/team/emma-dorsey.jpeg' },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: '/images/team/leonard-krasner.jpeg' },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: '/images/team/blake-reid.jpeg' },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: '/images/team/kathryn-murphy.jpeg' },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: '/images/team/whitney-francis.jpeg' },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: '/images/team/jeffrey-webb.jpeg' },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: '/images/team/benjamin-russel.jpeg' },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: '/images/team/angela-fisher.jpeg' },
      },
    ],
  },
];

export default function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Divider as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-primary-foreground">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-primary">
                          <Image
                            alt=""
                            {...person.image}
                            width={100}
                            height={100}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-primary-foreground">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  );
}

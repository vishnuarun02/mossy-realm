import CabinNotebook from '@/components/cabin/CabinNotebook';
import styles from '@/components/cabin/CabinNotebook.module.css';
import { Stamp } from '@/components/mossy-ui';
import InsetPanel from '@/components/ui/InsetPanel';
import TextLink from '@/components/ui/TextLink';
import { operator } from '@/lib/cabin-content';

/** /cabin/about - the operator's personal notebook page. */
export default function AboutPage() {
  return (
    <CabinNotebook title="about" subtitle="~ the person behind the moss ~">
      <section
        className={styles.profileSection}
        aria-labelledby="operator-profile"
      >
        <h2 id="operator-profile" className={styles.sectionLabel}>
          operator profile
        </h2>
        <Stamp tone="amber" size="sm" className={styles.profileStamp}>
          property of mossyrealm
        </Stamp>

        <div className={styles.profileLead}>
          <div className={styles.photoFrame}>
            operator photo
            <br />
            (not developed yet)
          </div>
          <p className={`${styles.bodyCopy} ${styles.profileCopy}`}>
            {operator.intro}
          </p>
        </div>

        <dl className={styles.facts}>
          {operator.quickFacts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      <section aria-labelledby="system-information">
        <h2 id="system-information" className={styles.sectionLabel}>
          system information
        </h2>
        <InsetPanel padding="sm" className={`${styles.terminalPanel} crt`}>
          <p className={styles.terminalCommand}>&gt; operator.sys --info</p>
          <dl className={styles.terminalRows}>
            {operator.systemSpecs.map((spec) => (
              <div key={spec.label} className={styles.terminalRow}>
                <dt className={styles.terminalKey}>{spec.label}</dt>
                <dd className={styles.terminalValue}>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p className="terminal terminal-cursor" aria-hidden="true">
            &gt;{' '}
          </p>
        </InsetPanel>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.detailGrid}>
        <section className={styles.compactSection} aria-labelledby="interests">
          <h2 id="interests" className={styles.sectionLabel}>
            interests
          </h2>
          <ul className={styles.interestList}>
            {operator.interests.map((group) => (
              <li key={group.group} className={styles.interestRow}>
                <span className={styles.interestLabel}>[ {group.group} ]</span>{' '}
                {group.items.join(' · ')}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.compactSection} aria-labelledby="timeline">
          <h2 id="timeline" className={styles.sectionLabel}>
            small timeline
          </h2>
          <ul className={styles.timeline}>
            {operator.timeline.map((entry, index) => (
              <li key={`${entry.year}-${index}`} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{entry.year}</span>
                <span className={styles.timelineMark} aria-hidden="true">
                  •
                </span>
                <span>{entry.entry}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.compactSection}
          aria-labelledby="currently-into"
        >
          <h2 id="currently-into" className={styles.sectionLabel}>
            currently into
          </h2>
          <p className={styles.interestRow}>
            <span className={styles.interestLabel}>current obsession:</span>{' '}
            {operator.currentObsession}
          </p>
          <ul className={styles.simpleList}>
            {operator.favorites.map((favorite) => (
              <li key={favorite} className={styles.simpleListItem}>
                <span className={styles.listMark} aria-hidden="true">
                  ✶
                </span>
                <span>{favorite}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.compactSection} aria-labelledby="elsewhere">
          <h2 id="elsewhere" className={styles.sectionLabel}>
            elsewhere
          </h2>
          <ul className={styles.elsewhereList}>
            {operator.realmLinks.map((link) => (
              <li key={link.href} className={styles.elsewhereItem}>
                <TextLink href={link.href} arrow>
                  {link.label}
                </TextLink>{' '}
                <span>: {link.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </CabinNotebook>
  );
}

'use client';

import styles from '../Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <aside className={styles.side}>
        <button className={styles.btn} onClick={() => router.push("/onas")}>O NÁS</button>
        <button className={styles.btn} onClick={() => router.push("/teorie")}>TEORIE</button>
        <button className={styles.btn} onClick={() => router.push("/priklady")}>PŘÍKLADY</button>
      </aside>

      <main className={styles.main}>
          <h1 className={styles.title}>
            Vítejte ve výukové části pro žáky! 
            Tato aplikace umožňuje procvičovat si znalosti matematiky v sekci Příklady, nebo se učit nové vědomosti v sekci Teorie. 
            Žák může sbírat body a peníze za správně vyřešené úkoly a sledovat svůj pokrok.
<br></br><br></br>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce consectetuer risus a nunc. Curabitur bibendum justo non orci. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sit amet magna in magna gravida vehicula. Integer pellentesque quam vel velit. Praesent dapibus. Sed convallis magna eu sem. Duis viverra diam non justo. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. In convallis. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Pellentesque arcu. Pellentesque ipsum. Phasellus faucibus molestie nisl. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.

Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Integer malesuada. Maecenas sollicitudin. Nullam sit amet magna in magna gravida vehicula. Aliquam in lorem sit amet leo accumsan lacinia. Proin in tellus sit amet nibh dignissim sagittis. Fusce consectetuer risus a nunc. Donec iaculis gravida nulla. Aenean id metus id velit ullamcorper pulvinar. Ut tempus purus at lorem. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis viverra diam non justo. Maecenas libero. Pellentesque ipsum.

Fusce nibh. Sed ac dolor sit amet purus malesuada congue. Maecenas fermentum, sem in pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Integer malesuada. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris elementum mauris vitae tortor. Curabitur vitae diam non enim vestibulum interdum. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Mauris metus. Donec vitae arcu. Praesent id justo in neque elementum ultrices. Aliquam ante. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Aenean fermentum risus id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Suspendisse nisl. Nullam dapibus fermentum ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Nullam faucibus mi quis velit. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Sed convallis magna eu sem. Vivamus porttitor turpis ac leo.

Nunc auctor. Fusce wisi. Praesent id justo in neque elementum ultrices. In enim a arcu imperdiet malesuada. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Etiam quis quam. Maecenas aliquet accumsan leo. Mauris metus. Proin in tellus sit amet nibh dignissim sagittis. Aliquam ornare wisi eu metus.
          </h1>
        
      </main>
    </div>
  );
}
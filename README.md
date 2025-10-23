# Atividades de Agentes Inteligentes e Ecossistemas Evolutivos em p5.js

Este repositório contém as implementações das Atividades 2.1, 2.2 e 2.3, propostas pelo Prof. Filipe Calegario. Os projetos exploram conceitos de agentes inteligentes e evolução artificial usando a biblioteca p5.js.

A progressão das atividades segue a seguinte lógica:
1.  **Agente Reativo Simples:** Um agente em um ambiente totalmente observável que reage a um estímulo (comida).
2.  **Agente Baseado em Modelos:** Um agente com percepção limitada (visão parcial) que precisa explorar o ambiente.
3.  **Algoritmos Genéticos:** Um ecossistema de agentes ("Bloops") que evoluem ao longo do tempo, introduzindo genes (visão) e reprodução sexuada (crossover).

---

## 📌 Atividade 2.1: Agente Coletando Comida (Ambiente Completamente Observável)

Nesta atividade, foi implementado um agente simples com o objetivo de coletar comidas que aparecem em posições aleatórias na tela.

**Comportamento implementado:**
* Uma comida surge em local aleatório.
* O agente percebe imediatamente a posição da comida (ambiente completamente observável).
* O agente se desloca diretamente em direção à comida.
* Ao colidir, a comida desaparece, um ponto é contabilizado (impresso no console) e uma nova comida surge em outro local.

**[Link para o sketch da Atividade 2.1](https://editor.p5js.org/gms2/full/lzW2KJCRY)**

---

## 📌 Atividade 2.2: Agente Procurando Comida (Ambiente Parcialmente Observável)

Baseado na Atividade 2.1, este agente opera em um ambiente parcialmente observável, exigindo que ele explore o cenário para encontrar a comida.

**Comportamento implementado:**
* Uma comida surge em local aleatório.
* O agente **explora** o ambiente, pois não sabe onde a comida está.
* O agente possui um **alcance de visão** limitado (visualizado no sketch).
* **Se** a comida entra em seu campo de visão, o agente muda seu comportamento e passa a persegui-la.
* Ao colidir, a comida desaparece, a pontuação é registrada e o ciclo recomeça.

**[Link para o sketch da Atividade 2.2](https://editor.p5js.org/gms2/full/GvNuL_SNJE)**

---

## 📌 Atividade 2.3: Evolução de um Ecossistema (Algoritmos Genéticos)

Baseando-se no exemplo "Evolution Ecosystem" do livro *Nature of Code*, esta atividade introduz conceitos de algoritmos genéticos para evoluir uma população de agentes ("Bloops").

**Modificações e implementações:**
1.  **Gene de Visão:** Foi adicionado um gene ao DNA dos Bloops para representar o **alcance da visão**.
2.  **Fenótipo e Comportamento:** O genótipo (DNA) se manifesta como um fenótipo (círculo de visão). O comportamento do Bloop segue a lógica da Atividade 2.2: ele explora até que uma comida entre em seu raio de visão, momento em que passa a persegui-la.
3.  **Reprodução com Crossover:** O método de reprodução foi alterado. Em vez de clonagem (cópia do DNA), foi implementado o **crossover**. O agente seleciona um parceiro (baseado no alcance de visão) para combinar seu material genético e gerar um descendente.

**[Link para o sketch da Atividade 2.3](https://editor.p5js.org/gms2/full/tSeVHaom-)**

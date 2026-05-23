Web3 QA Automation Lab

Мини-dApp, в котором есть несколько простых Web3-фич, каждая даёт отдельный тип тестирования.

Приложение можно назвать, например:

ChainLab QA: Fullstack Web3 Testing Playground

Суть: это маленькая Web3-песочница для демонстрации навыков QA Automation + frontend + smart contracts.

4. Что будет внутри продукта

Я предлагаю 4 модуля, но каждый простой.

Модуль 1. Wallet Login

Пользователь подключает кошелёк.

Фичи:

connect wallet;
disconnect wallet;
проверка правильной сети;
отображение адреса;
отображение баланса;
обработка rejected connection.

Что тестируем:

UI;
wallet state;
wrong network;
empty wallet;
reconnect after refresh.

Это база любого Web3 QA.

Модуль 2. Faucet / Test Token

Смарт-контракт выдаёт тестовые токены.

Фичи:

пользователь нажимает Claim;
получает mock ERC-20 token;
есть лимит, например 100 токенов за claim;
можно запретить повторный claim слишком часто.

Что тестируем:

smart contract logic;
transaction success;
transaction failure;
frontend state after transaction;
balance update.

Это даст практику с ERC-20.

Модуль 3. NFT Mint

Пользователь минтит простой NFT.

Фичи:

mint NFT;
показать tokenId;
показать владельца NFT;
запретить mint без кошелька;
ограничить supply, например максимум 20 NFT.

Что тестируем:

smart contract limits;
UI validation;
blockchain event;
metadata loading;
transaction pending/success/error.

Это даст практику с ERC-721.

Модуль 4. DAO Voting Mini

Пользователь голосует за один из вариантов.

Фичи:

есть proposal;
можно проголосовать Yes/No;
один адрес = один голос;
показываем результаты;
нельзя голосовать дважды.

Что тестируем:

business logic;
access control;
duplicate action;
event logs;
frontend sync with contract state.

Это уже выглядит взрослее, чем просто NFT mint.

5. Почему это хороший GitHub-проект

Он показывает сразу несколько ролей:

Как QA:

test strategy;
test plan;
test cases;
bug reports;
exploratory testing notes;
risk-based testing.

Как Automation Engineer:

Playwright E2E;
API/RPC tests;
CI pipeline;
fixtures;
mocks;
test reports.

Как Web3-aware engineer:

Solidity contracts;
Hardhat tests;
contract events;
wallet flows;
testnet/local chain;
blockchain explorer links.

Как fullstack dev:

React/Next.js frontend;
TypeScript;
smart contract integration;
clean README;
project architecture.
6. Предлагаемый стек

Я бы взял такой стек:

Next.js + TypeScript для frontend;
wagmi + viem для Web3-интеграции;
RainbowKit или простой wallet connector;
Solidity для контрактов;
Hardhat для compile/deploy/unit tests;
Playwright для E2E;
GitHub Actions для CI;
ESLint + Prettier;
local Hardhat network сначала;
потом optional deploy в Sepolia или Base Sepolia.

Почему не Foundry сразу: Foundry отличный, но для твоей цели JS/TS + Automation логичнее начать с Hardhat. Позже можно добавить Foundry как отдельный advanced-блок.

7. Какие уровни тестов заложим

Покрытие не должно быть огромным, но структура должна быть профессиональной.

1. Unit tests для smart contracts

Например:

faucet выдаёт токены;
нельзя claim чаще лимита;
NFT mint увеличивает totalSupply;
нельзя mint после maxSupply;
нельзя голосовать дважды.
2. Integration tests

Например:

frontend читает balance из контракта;
frontend показывает owner NFT;
vote transaction меняет результаты.
3. E2E tests через Playwright

Например:

пользователь открывает dApp;
видит wallet connect screen;
wrong network показывает ошибку;
после mock wallet connection видит dashboard;
claim flow отображает pending/success state.
4. RPC/API-level tests

Например:

проверить eth_chainId;
прочитать contract state через viem;
проверить emitted events;
проверить balance до/после транзакции.
5. Negative tests

Например:

reject transaction;
insufficient balance;
disconnected wallet;
wrong chain;
duplicate vote;
max NFT supply reached.
6. CI tests

В GitHub Actions:

install;
lint;
contract tests;
frontend tests;
Playwright smoke tests.
8. Как будет выглядеть репозиторий

Примерно так:

chainlab-qa/
  apps/
    web/
      src/
      tests/e2e/
  contracts/
    contracts/
      TestToken.sol
      Faucet.sol
      ChainLabNFT.sol
      Voting.sol
    test/
    scripts/
  docs/
    test-strategy.md
    test-plan.md
    test-cases.md
    bug-reports/
    risks.md
  .github/
    workflows/
      ci.yml
  README.md

Это уже будет выглядеть как нормальный open-source QA/dev проект, а не просто учебный туториал.

9. Я бы выбрал сценарий “всего по чуть-чуть”, но без хаоса

Твой запрос «в идеале всего по чуть-чуть» правильный, но опасность в том, что проект может стать размазанным.

Поэтому я предлагаю не “всё подряд”, а один продукт с 4 маленькими Web3-флоу:

Wallet Login
Claim Test Token
Mint NFT
Vote in DAO

Этого достаточно, чтобы показать ширину. При этом проект останется реалистичным.

10. Поэтапный план проекта
Phase 0 — Project Design

Результат:

README skeleton;
architecture decision record;
test strategy;
выбранный стек;
definition of done.
Phase 1 — Local Web3 Environment

Результат:

Hardhat project;
local blockchain;
первый контракт;
первый unit test;
deploy script.
Phase 2 — Smart Contracts

Результат:

TestToken;
Faucet;
NFT;
Voting;
basic unit tests.
Phase 3 — Frontend dApp

Результат:

Next.js app;
wallet connect;
dashboard;
claim/mint/vote screens;
transaction states.
Phase 4 — Automation Foundation

Результат:

Playwright setup;
smoke tests;
wallet mocking strategy;
RPC helpers;
test data fixtures.
Phase 5 — QA Documentation

Результат:

test plan;
checklist;
bug report examples;
risk matrix;
exploratory testing notes.
Phase 6 — CI/CD

Результат:

GitHub Actions;
lint/test/build;
Playwright in CI;
test artifacts.
Phase 7 — Testnet Deployment

Результат:

deploy to Sepolia/Base Sepolia;
published contract addresses;
environment variables;
public demo instructions.
Phase 8 — Polish for Portfolio

Результат:

clean README;
screenshots;
badges;
architecture diagram;
“What I tested” section;
“Known risks and limitations” section.
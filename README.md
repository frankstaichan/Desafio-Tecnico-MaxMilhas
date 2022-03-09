# Microserviço de Autorização
# Índice
- [Microserviço de Autorização](#microserviço-de-autorização)
- [Índice](#índice)
- [Introdução](#introdução)
- [Instalação](#instalação)
  - [1 - Docker](#1---docker)
    - [1.1 - Docker Build](#11---docker-build)
    - [1.2 - Docker Run](#12---docker-run)
  - [2 - Chamadas de rotas](#2---chamadas-de-rotas)
  - [3 - Testes](#3---testes)
- [Serviço Blacklist](#serviço-blacklist)
  - [1 - Verificando Status](#1---verificando-status)
    - [1.1 - Endpoint](#11---endpoint)
      - [1.1.1 - Configuração da Requisição](#111---configuração-da-requisição)
        - [1.1.1.1 - Exemplo de Requisição](#1111---exemplo-de-requisição)
      - [1.1.2 - Resposta do Endpoint](#112---resposta-do-endpoint)
        - [1.1.2.1 - Exemplo de Resposta](#1121---exemplo-de-resposta)
  - [2 - Incluindo um CPF na Blacklist](#2---incluindo-um-cpf-na-blacklist)
    - [2.1 - Endpoint](#21---endpoint)
      - [2.1.1 - Configuração da Requisição](#211---configuração-da-requisição)
        - [2.1.1.1 - Parametros da Requisição Detalhados](#2111---parametros-da-requisição-detalhados)
      - [2.1.2 - Resposta do Endpoint](#212---resposta-do-endpoint)
        - [2.1.2.1 - Exemplo de Resposta](#2121---exemplo-de-resposta)
  - [3 - Mudança de Status de um Item](#3---mudança-de-status-de-um-item)
    - [3.1 - Endpoint](#31---endpoint)
      - [3.1.1 - Configuração da Requisição](#311---configuração-da-requisição)
        - [3.1.1.1 - Parametros da Requisição Detalhados](#3111---parametros-da-requisição-detalhados)
      - [3.1.2 - Resposta do Endpoint](#312---resposta-do-endpoint)
        - [3.1.2.1 - Exemplo de Resposta](#3121---exemplo-de-resposta)
  - [4 - Deleção de Item](#4---deleção-de-item)
    - [4.1 - Endpoint](#41---endpoint)
      - [4.1.1 - Configuração da Requisição](#411---configuração-da-requisição)
        - [4.1.1.1 - Parametros da Requisição Detalhados](#4111---parametros-da-requisição-detalhados)
      - [4.1.2 - Resposta do Endpoint](#412---resposta-do-endpoint)
        - [4.1.2.1 - Exemplo de Resposta](#4121---exemplo-de-resposta)
  - [5 - Pesquisa de um Item](#5---pesquisa-de-um-item)
    - [5.1 - Endpoint](#51---endpoint)
      - [5.1.1 - Configuração da Requisição](#511---configuração-da-requisição)
        - [5.1.1.1 - Parametros da Requisição Detalhados](#5111---parametros-da-requisição-detalhados)
      - [5.1.2 - Resposta do Endpoint](#512---resposta-do-endpoint)
        - [5.1.2.1 - Exemplo de Resposta](#5121---exemplo-de-resposta)
# Introdução
Este projeto conta com um serviço responsável pelo gerenciamento de uma lista de CPFs e seus status correspondentes.

# Instalação

## 1 - Docker

Este projeto utiliza conteinerização via Docker

### 1.1 - Docker Build

Para construir a imagem deste projeto, deve-se inicialmente ir até o caminho da pasta do mesmo no terminal(CMD, Powershell, GitBash, entre outros).

```command line
cd <CAMINHO DA PASTA DO PROJETO>
```

Após isto deve-se utilizar o comando:

```command line
docker build -t desafio_maxmilhas .
```

### 1.2 - Docker Run

Após construir a imagem, precisamos inicializar o container do projeto a partir desta imagem

```command line
docker run -p 8000:8000 --name cnt_desafio_maxmilhas -d desafio_maxmilhas
```

## 2 - Chamadas de rotas

Com o container inicializado e rodando, para acessarmos as rotas da aplicação devemos fazer chamadas a partir da url:

```url
http://localhost:8000/
```

## 3 - Testes

Para iniciar a bateria de testes automatizados da aplicação, é necessario que a partir do terminal acessando a pasta da aplicação utilizemos o comando `npm install`, certificando-se que a versão do `node` do sistema é `14.17.0`. Após realizada a instalação das dependências da aplicação, devemos utilizar o comando:

```command line
npm test
```

# Serviço Blacklist

## 1 - Verificando Status

Neste projeto podemos verificar a quantidade de consultas em endpoints desde o último start da aplicação além da quantidade de CPFs registrados na Blacklist.

### 1.1 - Endpoint

```url
/status
```

#### 1.1.1 - Configuração da Requisição

| Parameter | Description | Value |  Obs. |
| - | - | - | - |
| `url`  | URL para Requisição | `/status` | - |
| `method`  | Método HTTP da Requisição | `GET`   | - |
| `baseURL`  | URL base para Requisição | `http://localhost:8000/status` | - |
| `params`  | Parâmetros não necessários para esta requisição | - | - |
| `headers`  | Headers não necessários para esta requisição | - | - |

##### 1.1.1.1 - Exemplo de Requisição

```url
http://localhost:8000/status
```

#### 1.1.2 - Resposta do Endpoint

##### 1.1.2.1 - Exemplo de Resposta

```JSON
{
    "success": true,
    "message": "Total CPFs in the Blacklist: 11. Total CPF searches: 0",
    "itemCount": 11,
    "searchCount": 0
}
```

## 2 - Incluindo um CPF na Blacklist

É possível incluir um novo CPF na Blacklist apenas informando o número do CPF sem caracteres especiais ("." ou "-") e o status inicial do registro do CPF, podendo este ser `FREE` ou `BLOCK`.
  
### 2.1 - Endpoint

```url
/include/:cpf/:status
```

#### 2.1.1 - Configuração da Requisição

| Parameter | Description | Value |  Obs. |
| - | - | - | - |
| `url`  | URL para Requisição | `/include/:cpf/:status` | - |
| `method`  | Método HTTP da Requisição | `POST`   | - |
| `baseURL`  | URL base para Requisição | `http://localhost:8000/include/:cpf/:status` | - |
| `params`  | Parâmetros não necessários para esta requisição | `CPF`, `STATUS` | - |
| `headers`  | Headers não necessários para esta requisição | - | - |

##### 2.1.1.1 - Parametros da Requisição Detalhados

```javascript
CPF: `CPF a ser registrado`
STATUS: `Status a ser registrado`
```

#### 2.1.2 - Resposta do Endpoint

##### 2.1.2.1 - Exemplo de Resposta

```JSON
{
    "success": true,
    "message": "CPF 157.826.354-78 has been included in the Blacklist.",
    "item": {
        "item": {
            "cpf": "157.826.354-78",
            "status": "FREE",
            "createdAt": "2022-03-09T18:08:18.764Z",
            "updatedAt": "2022-03-09T18:08:18.764Z"
        }
    }
}
```

## 3 - Mudança de Status de um Item

É possível alterar o status de um CPF na Blacklist apenas informando o número do CPF sem caracteres especiais ("." ou "-") e o status a ser alterado, podendo este ser `FREE` ou `BLOCK`.
  
### 3.1 - Endpoint

```url
/changeStatus/:cpf/:status
```

#### 3.1.1 - Configuração da Requisição

| Parameter | Description | Value |  Obs. |
| - | - | - | - |
| `url`  | URL para Requisição | `/changeStatus/:cpf/:status` | - |
| `method`  | Método HTTP da Requisição | `POST`   | - |
| `baseURL`  | URL base para Requisição | `http://localhost:8000/changeStatus/:cpf/:status` | - |
| `params`  | Parâmetros não necessários para esta requisição | `CPF`, `STATUS` | - |
| `headers`  | Headers não necessários para esta requisição | - | - |

##### 3.1.1.1 - Parametros da Requisição Detalhados

```javascript
CPF: `CPF a ser alterado`
STATUS: `Status a ser alterado`
```

#### 3.1.2 - Resposta do Endpoint

##### 3.1.2.1 - Exemplo de Resposta

```JSON
{
    "success": true,
    "message": "157.826.354-78 CPF status has been changed to 'BLOCK'",
    "item": {
        "item": {
            "cpf": "157.826.354-78",
            "status": "BLOCK",
            "createdAt": "2022-03-09T18:08:18.764Z",
            "updatedAt": "2022-03-09T18:13:12.731Z"
        }
    }
}
```

## 4 - Deleção de Item

É possível alterar o status de um CPF na Blacklist apenas informando o número do CPF sem caracteres especiais ("." ou "-") e o status a ser alterado, podendo este ser `FREE` ou `BLOCK`.
  
### 4.1 - Endpoint

```url
/delete/:cpf
```

#### 4.1.1 - Configuração da Requisição

| Parameter | Description | Value |  Obs. |
| - | - | - | - |
| `url`  | URL para Requisição | `/delete/:cpf` | - |
| `method`  | Método HTTP da Requisição | `DELETE`   | - |
| `baseURL`  | URL base para Requisição | `http://localhost:8000/delete/:cpf` | - |
| `params`  | Parâmetros não necessários para esta requisição | `CPF` | - |
| `headers`  | Headers não necessários para esta requisição | - | - |

##### 4.1.1.1 - Parametros da Requisição Detalhados

```javascript
CPF: `CPF a ser deletado`
```

#### 4.1.2 - Resposta do Endpoint

##### 4.1.2.1 - Exemplo de Resposta

```JSON
{
    "success": true,
    "message": "CPF 157.826.354-78 successfully deleted from the Blacklist.",
    "item": {
        "item": {
            "cpf": "157.826.354-78",
            "status": "BLOCK",
            "createdAt": "2022-03-09T18:08:18.764Z",
            "updatedAt": "2022-03-09T18:13:12.731Z"
        }
    }
}
```

## 5 - Pesquisa de um Item

É possível alterar o status de um CPF na Blacklist apenas informando o número do CPF sem caracteres especiais ("." ou "-") e o status a ser alterado, podendo este ser `FREE` ou `BLOCK`.
  
### 5.1 - Endpoint

```url
/search/:cpf
```

#### 5.1.1 - Configuração da Requisição

| Parameter | Description | Value |  Obs. |
| - | - | - | - |
| `url`  | URL para Requisição | `/search/:cpf` | - |
| `method`  | Método HTTP da Requisição | `GET`   | - |
| `baseURL`  | URL base para Requisição | `http://localhost:8000/search/:cpf` | - |
| `params`  | Parâmetros não necessários para esta requisição | `CPF` | - |
| `headers`  | Headers não necessários para esta requisição | - | - |

##### 5.1.1.1 - Parametros da Requisição Detalhados

```javascript
CPF: `CPF a ser pesquisado`
```

#### 5.1.2 - Resposta do Endpoint

##### 5.1.2.1 - Exemplo de Resposta

```JSON
{
    "success": true,
    "message": "Found an item in the Blacklist with the CPF 123.456.789-11.",
    "item": {
        "item": {
            "cpf": "123.456.789-11",
            "status": "FREE",
            "createdAt": "2022-03-08T01:45:17.710Z",
            "updatedAt": "2022-03-09T17:57:19.207Z"
        }
    }
}
```

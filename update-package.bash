#!/bin/bash

# Script para minificar arquivos JS e CSS e publicar no npm
# Para Xique Xique (anteriormente GainTime)

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Xique Xique - Processo de Publicação ===${NC}"

# Verifica se as dependências necessárias estão instaladas
check_dependencies() {
  echo -e "\n${YELLOW}Verificando dependências...${NC}"
  
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm não está instalado. Por favor, instale o Node.js e npm.${NC}"
    exit 1
  fi
  
  # Instalar dependências de desenvolvimento se não existirem
  if ! command -v uglifyjs &> /dev/null; then
    echo -e "${YELLOW}UglifyJS não encontrado. Instalando...${NC}"
    npm install --save-dev uglify-js
  fi
  
  if ! command -v cleancss &> /dev/null; then
    echo -e "${YELLOW}CleanCSS não encontrado. Instalando...${NC}"
    npm install --save-dev clean-css-cli
  fi
  
  echo -e "${GREEN}Todas as dependências verificadas!${NC}"
}

# Verifica se o usuário está logado no npm
check_npm_login() {
  echo -e "\n${YELLOW}Verificando login no npm...${NC}"
  
  if npm whoami &> /dev/null; then
    echo -e "${GREEN}Você já está logado como $(npm whoami)${NC}"
  else
    echo -e "${YELLOW}Você não está logado no npm. Iniciando login...${NC}"
    npm login
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Falha no login. Abortando.${NC}"
      exit 1
    fi
    
    echo -e "${GREEN}Login realizado com sucesso como $(npm whoami)${NC}"
  fi
}

# Minifica os arquivos JavaScript
minify_js() {
  echo -e "\n${YELLOW}Minificando arquivos JavaScript...${NC}"
  
  # Criar diretório para arquivos minificados se não existir
  mkdir -p dist/js
  
  # Minificar gaintime.js
  echo "Minificando gaintime.js..."
  npx uglifyjs js/gaintime.js -c -m -o dist/js/gaintime.min.js
  
  # Minificar theme.js
  echo "Minificando theme.js..."
  npx uglifyjs js/theme.js -c -m -o dist/js/theme.min.js
  
  echo -e "${GREEN}Minificação de JavaScript concluída!${NC}"
}

# Minifica os arquivos CSS
minify_css() {
  echo -e "\n${YELLOW}Minificando arquivos CSS...${NC}"
  
  # Criar diretório para arquivos minificados se não existir
  mkdir -p dist/css
  
  # Minificar gaintime.css
  echo "Minificando gaintime.css..."
  npx cleancss -o dist/css/gaintime.min.css css/gaintime.css
  
  echo -e "${GREEN}Minificação de CSS concluída!${NC}"
}

# Copia outros arquivos necessários para a pasta dist
copy_files() {
  echo -e "\n${YELLOW}Copiando arquivos para distribuição...${NC}"
  
  # Copiar package.json, README.md, etc
  cp package.json dist/
  cp README.md dist/
  cp LICENSE dist/ 2>/dev/null || echo "Arquivo LICENSE não encontrado, ignorando..."
  
  echo -e "${GREEN}Arquivos copiados com sucesso!${NC}"
}

# Atualiza a versão do pacote
update_version() {
  echo -e "\n${YELLOW}Deseja atualizar a versão do pacote?${NC}"
  echo "1) Patch (3.0.0 -> 3.0.1)"
  echo "2) Minor (3.0.0 -> 3.1.0)"
  echo "3) Major (3.0.0 -> 4.0.0)"
  echo "4) Não atualizar"
  
  read -p "Escolha uma opção (1-4): " version_option
  
  case $version_option in
    1)
      npm version patch
      ;;
    2)
      npm version minor
      ;;
    3)
      npm version major
      ;;
    4)
      echo -e "${YELLOW}Mantendo versão atual.${NC}"
      ;;
    *)
      echo -e "${RED}Opção inválida. Mantendo versão atual.${NC}"
      ;;
  esac
}

# Publica o pacote no npm
publish_package() {
  echo -e "\n${YELLOW}Publicando pacote no npm...${NC}"
  
  # Entrar na pasta dist e publicar
  cd dist
  
  echo -e "${YELLOW}Confirmar publicação? (s/N)${NC}"
  read -p "" confirm
  
  if [[ $confirm == "s" || $confirm == "S" ]]; then
    npm publish
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Pacote publicado com sucesso!${NC}"
    else
      echo -e "${RED}Falha ao publicar o pacote.${NC}"
      exit 1
    fi
  else
    echo -e "${YELLOW}Publicação cancelada pelo usuário.${NC}"
  fi
  
  cd ..
}

# Função principal
main() {
  check_dependencies
  check_npm_login
  update_version
  minify_js
  minify_css
  copy_files
  publish_package
  
  echo -e "\n${GREEN}Processo concluído com sucesso!${NC}"
}

# Executar função principal
main
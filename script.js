document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const langToggle = document.getElementById('lang-toggle');
    const langSwitchWrapper = document.querySelector('.lang-switch-wrapper');
    const translations = {
        'en': {
            'title': 'Classical Cipher Tools',
            'subtitle': 'Implement encryption and decryption of Caesar cipher and Rail Fence cipher',
            'caesar': 'Caesar Cipher',
            'railfence': 'Rail Fence Cipher',
            'input_text': 'Input Text:',
            'characters': 'characters',
            'shift': 'Shift (1-25):',
            'rails': 'Rails (2-10):',
            'encrypt': 'Encrypt',
            'decrypt': 'Decrypt',
            'bruteforce': 'Brute Force',
            'result': 'Result:',
            'bruteforce_results': 'Brute Force Results:',
            'rail_visualization': 'Rail Fence Visualization:',
            'history': 'History',
            'footer_text': 'Caesar Cipher & Rail Fence Cipher',
            'copied': 'Copied to clipboard',
            'empty_history': 'No history records',
            'key_label': 'Key',
            'apply': 'Apply',
            'delete': 'Delete',
            'clear_text': 'Clear text',
            'generate_random': 'Generate random text',
            'copy_result': 'Copy result',
            'enter_encrypt_text': 'Please enter text to encrypt',
            'enter_decrypt_text': 'Please enter text to decrypt',
            'enter_bruteforce_text': 'Please enter text to brute force',
            'shift_range_error': 'Shift must be an integer between 1 and 25',
            'rails_range_error': 'Rails must be an integer between 2 and 10'
        },
        'zh': {
            'title': '古典密码工具',
            'subtitle': '实现凯撒密码和栅栏密码的加解密',
            'caesar': '凯撒密码',
            'railfence': '栅栏密码',
            'input_text': '输入文本：',
            'characters': '个字符',
            'shift': '位移量 (1-25)：',
            'rails': '栏数 (2-10)：',
            'encrypt': '加密',
            'decrypt': '解密',
            'bruteforce': '暴力破解',
            'result': '结果：',
            'bruteforce_results': '暴力破解结果：',
            'rail_visualization': '栅栏可视化：',
            'history': '历史记录',
            'footer_text': '凯撒密码 & 栅栏密码',
            'copied': '已复制到剪贴板',
            'empty_history': '暂无历史记录',
            'key_label': '密钥',
            'apply': '应用',
            'delete': '删除',
            'clear_text': '清空文本',
            'generate_random': '生成随机文本',
            'copy_result': '复制结果',
            'enter_encrypt_text': '请输入要加密的文本',
            'enter_decrypt_text': '请输入要解密的文本',
            'enter_bruteforce_text': '请输入要破解的文本',
            'shift_range_error': '位移量必须是1到25之间的整数',
            'rails_range_error': '栏数必须是2到10之间的整数'
        }
    };
    
    // 设置语言
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // 更新按钮的title属性
        document.querySelector('.clear-btn').title = translations[lang]['clear_text'];
        document.querySelector('.random-btn').title = translations[lang]['generate_random'];
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.title = translations[lang]['copy_result'];
        });
        
        // 更新textarea的placeholder
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.placeholder = lang === 'en' ? 
                "Please enter text to process..." : 
                "请输入要处理的文本...";
        });
        
        // 更新历史记录中的文本
        updateHistoryTexts(lang);
        
        // 保存语言设置到本地存储
        localStorage.setItem('preferred-language', lang);
        
        // 添加脉冲动画效果
        langSwitchWrapper.classList.add('pulse');
        setTimeout(() => {
            langSwitchWrapper.classList.remove('pulse');
        }, 500);
    }
    
    // 更新历史记录中的文本
    function updateHistoryTexts(lang) {
        const historyItems = document.querySelectorAll('.history-item');
        if (historyItems.length === 0) return;
        
        historyItems.forEach(item => {
            const typeElement = item.querySelector('.history-type');
            if (typeElement) {
                const isCaesar = typeElement.innerHTML.includes('fa-key');
                const isEncrypt = typeElement.innerHTML.includes('加密') || typeElement.innerHTML.includes('Encrypt');
                const isDecrypt = typeElement.innerHTML.includes('解密') || typeElement.innerHTML.includes('Decrypt');
                const isBruteforce = typeElement.innerHTML.includes('暴力破解') || typeElement.innerHTML.includes('Brute Force');
                
                let newText = '';
                if (isCaesar) {
                    newText += `<i class="fas fa-key"></i> ${translations[lang]['caesar']} `;
                } else {
                    newText += `<i class="fas fa-bars"></i> ${translations[lang]['railfence']} `;
                }
                
                if (isEncrypt) {
                    newText += translations[lang]['encrypt'];
                } else if (isDecrypt) {
                    newText += translations[lang]['decrypt'];
                } else if (isBruteforce) {
                    newText += translations[lang]['bruteforce'];
                }
                
                typeElement.innerHTML = newText;
            }
            
            const applyBtn = item.querySelector('.history-apply');
            const deleteBtn = item.querySelector('.history-delete');
            
            if (applyBtn) applyBtn.title = translations[lang]['apply'];
            if (deleteBtn) deleteBtn.title = translations[lang]['delete'];
        });
        
        // 更新空历史记录提示
        const emptyHistory = document.querySelector('.history-empty');
        if (emptyHistory) {
            emptyHistory.textContent = translations[lang]['empty_history'];
        }
    }
    
    // 语言切换事件
    langToggle.addEventListener('change', function() {
        const lang = this.checked ? 'zh' : 'en';
        setLanguage(lang);
    });
    
    // 初始化语言设置
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    langToggle.checked = savedLang === 'zh';
    setLanguage(savedLang);
    
    // 选项卡切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 添加点击的选项卡活动状态
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 复制功能
    function setupCopyButton(buttonId, sourceId) {
        const copyBtn = document.getElementById(buttonId);
        const sourceElement = document.getElementById(sourceId);
        
        copyBtn.addEventListener('click', () => {
            if (!sourceElement.textContent.trim()) return;
            
            navigator.clipboard.writeText(sourceElement.textContent)
                .then(() => {
                    showNotification();
                    sourceElement.classList.add('highlight');
                    setTimeout(() => {
                        sourceElement.classList.remove('highlight');
                    }, 1000);
                })
                .catch(err => {
                    console.error('无法复制文本: ', err);
                });
        });
    }
    
    // 设置复制按钮
    setupCopyButton('caesar-copy-btn', 'caesar-output');
    setupCopyButton('railfence-copy-btn', 'railfence-output');
    
    // 显示通知
    function showNotification() {
        const notification = document.getElementById('copy-notification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
    
    // 字符计数功能
    function setupCharacterCounter(inputId, countId) {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(countId);
        
        // 初始计数
        counter.textContent = input.value.length;
        
        // 输入事件
        input.addEventListener('input', () => {
            counter.textContent = input.value.length;
        });
    }
    
    // 设置字符计数
    setupCharacterCounter('caesar-input', 'caesar-char-count');
    setupCharacterCounter('railfence-input', 'railfence-char-count');
    
    // 增减密钥按钮功能
    function setupKeyButtons(container) {
        const keyInput = container.querySelector('input[type="number"]');
        const decreaseBtn = container.querySelector('.decrease-key');
        const increaseBtn = container.querySelector('.increase-key');
        
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(keyInput.value);
            const minValue = parseInt(keyInput.min);
            
            if (currentValue > minValue) {
                keyInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(keyInput.value);
            const maxValue = parseInt(keyInput.max);
            
            if (currentValue < maxValue) {
                keyInput.value = currentValue + 1;
            }
        });
    }
    
    // 设置密钥按钮
    const keyInputContainers = document.querySelectorAll('.input-with-buttons');
    keyInputContainers.forEach(container => {
        setupKeyButtons(container);
    });
    
    // 清空和随机文本功能
    function setupTextAreaActions(container) {
        const textarea = container.querySelector('textarea');
        const clearBtn = container.querySelector('.clear-btn');
        const randomBtn = container.querySelector('.random-btn');
        
        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            textarea.dispatchEvent(new Event('input')); // 触发input事件更新字符计数
            textarea.focus();
        });
        
        randomBtn.addEventListener('click', () => {
            // 判断是哪种密码的文本区域
            const isCaesar = textarea.id === 'caesar-input';
            
            // 凯撒密码只能处理英文字母，所以只提供英文样本
            const caesarSampleTexts = [
                "the quick brown fox jumps over the lazy dog",
                "hello world this is a test message for encryption",
                "caesar cipher is one of the oldest encryption techniques",
                "cryptography is the practice of secure communication",
                "we need to protect our secret messages from enemies"
            ];
            
            // 栅栏密码可以处理任何字符
            const railFenceSampleTexts = [
                "the quick brown fox jumps over the lazy dog",
                "hello world, this is a test message for encryption",
                "rail fence cipher creates a zigzag pattern",
                "cryptography is the practice of secure communication",
                "古典密码学包括凯撒密码和栅栏密码等加密方法",
                "计算机科学与密码学有着密切的关系",
                "Rail fence cipher can handle numbers like 12345 and symbols !@#$%"
            ];
            
            const sampleTexts = isCaesar ? caesarSampleTexts : railFenceSampleTexts;
            const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
            textarea.value = randomText;
            textarea.dispatchEvent(new Event('input')); // 触发input事件更新字符计数
        });
    }
    
    // 设置文本区域操作
    const textareaContainers = document.querySelectorAll('.textarea-container');
    textareaContainers.forEach(container => {
        setupTextAreaActions(container);
    });
    
    // 历史记录功能
    const historySection = document.querySelector('.history-section');
    const historyContainer = document.querySelector('.history-container');
    let history = JSON.parse(localStorage.getItem('cipher-history')) || [];
    
    // 显示历史记录
    function displayHistory() {
        historyContainer.innerHTML = '';
        
        if (history.length === 0) {
            historyContainer.innerHTML = `<div class="history-empty">${translations[document.documentElement.lang]['empty_history']}</div>`;
            return;
        }
        
        // 显示最近的10条记录
        history.slice(0, 10).forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const lang = document.documentElement.lang;
            const typeText = item.type === 'caesar' ? translations[lang]['caesar'] : translations[lang]['railfence'];
            let operationText = '';
            
            if (item.operation === 'encrypt') {
                operationText = translations[lang]['encrypt'];
            } else if (item.operation === 'decrypt') {
                operationText = translations[lang]['decrypt'];
            } else {
                operationText = translations[lang]['bruteforce'];
            }
            
            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="history-type">
                        <i class="fas ${item.type === 'caesar' ? 'fa-key' : 'fa-bars'}"></i>
                        ${typeText} ${operationText}
                    </div>
                    <div class="history-text">${item.input}</div>
                </div>
                <div class="history-actions">
                    <button class="history-btn history-apply" data-index="${index}" title="${translations[lang]['apply']}"><i class="fas fa-reply"></i></button>
                    <button class="history-btn history-delete" data-index="${index}" title="${translations[lang]['delete']}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            historyContainer.appendChild(historyItem);
        });
        
        // 绑定历史记录操作
        document.querySelectorAll('.history-apply').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const item = history[index];
                
                // 根据类型切换到相应的选项卡
                document.querySelector(`.tab-btn[data-tab="${item.type}"]`).click();
                
                // 填充输入
                document.getElementById(`${item.type}-input`).value = item.input;
                document.getElementById(`${item.type}-key`).value = item.key;
                
                // 更新字符计数
                document.getElementById(`${item.type}-char-count`).textContent = item.input.length;
                
                // 如果是凯撒暴力破解，则点击暴力破解按钮
                if (item.type === 'caesar' && item.operation === 'bruteforce') {
                    document.getElementById('caesar-bruteforce').click();
                }
                // 否则点击相应的加密或解密按钮
                else {
                    document.getElementById(`${item.type}-${item.operation}`).click();
                }
            });
        });
        
        document.querySelectorAll('.history-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                history.splice(index, 1);
                localStorage.setItem('cipher-history', JSON.stringify(history));
                displayHistory();
            });
        });
    }
    
    // 添加历史记录
    function addToHistory(type, operation, input, output, key) {
        // 限制历史记录长度
        if (history.length >= 20) {
            history.pop();
        }
        
        // 添加新记录到开头
        history.unshift({
            type,
            operation,
            input,
            output,
            key,
            timestamp: new Date().getTime()
        });
        
        // 保存到本地存储
        localStorage.setItem('cipher-history', JSON.stringify(history));
        
        // 显示历史记录区域
        historySection.classList.add('show');
        
        // 刷新历史记录显示
        displayHistory();
    }
    
    // 初始化显示历史记录
    if (history.length > 0) {
        historySection.classList.add('show');
        displayHistory();
    }
    
    // 凯撒密码功能
    const caesarInput = document.getElementById('caesar-input');
    const caesarKey = document.getElementById('caesar-key');
    const caesarOutput = document.getElementById('caesar-output');
    const caesarEncryptBtn = document.getElementById('caesar-encrypt');
    const caesarDecryptBtn = document.getElementById('caesar-decrypt');
    const caesarBruteforceBtn = document.getElementById('caesar-bruteforce');
    const bruteforceResults = document.getElementById('caesar-bruteforce-results');
    const resultsContainer = bruteforceResults.querySelector('.results-container');
    
    // 凯撒加密
    caesarEncryptBtn.addEventListener('click', () => {
        const text = caesarInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_encrypt_text']);
            return;
        }
        
        const key = parseInt(caesarKey.value);
        if (isNaN(key) || key < 1 || key > 25) {
            alert(translations[document.documentElement.lang]['shift_range_error']);
            return;
        }
        
        const encrypted = caesarCipher(text, key);
        caesarOutput.textContent = encrypted;
        caesarOutput.classList.add('highlight');
        setTimeout(() => {
            caesarOutput.classList.remove('highlight');
        }, 1000);
        
        // 隐藏暴力破解结果
        bruteforceResults.classList.remove('show');
        
        // 添加到历史记录
        addToHistory('caesar', 'encrypt', text, encrypted, key);
    });
    
    // 凯撒解密
    caesarDecryptBtn.addEventListener('click', () => {
        const text = caesarInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_decrypt_text']);
            return;
        }
        
        const key = parseInt(caesarKey.value);
        if (isNaN(key) || key < 1 || key > 25) {
            alert(translations[document.documentElement.lang]['shift_range_error']);
            return;
        }
        
        // 解密就是用26减去密钥后加密
        const decrypted = caesarCipher(text, 26 - key);
        caesarOutput.textContent = decrypted;
        caesarOutput.classList.add('highlight');
        setTimeout(() => {
            caesarOutput.classList.remove('highlight');
        }, 1000);
        
        // 隐藏暴力破解结果
        bruteforceResults.classList.remove('show');
        
        // 添加到历史记录
        addToHistory('caesar', 'decrypt', text, decrypted, key);
    });
    
    // 暴力破解凯撒密码
    caesarBruteforceBtn.addEventListener('click', () => {
        const text = caesarInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_bruteforce_text']);
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        // 所有可能的结果
        let allResults = [];
        
        // 尝试所有可能的密钥（1-25）
        for (let key = 1; key <= 25; key++) {
            const decrypted = caesarCipher(text, 26 - key);
            allResults.push({ key, text: decrypted });
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.setAttribute('data-key', key);
            
            // 如果是当前选择的密钥，突出显示
            if (parseInt(caesarKey.value) === key) {
                resultItem.classList.add('highlighted');
            }
            
            resultItem.innerHTML = `
                <div class="key-label">${translations[document.documentElement.lang]['key_label']} ${key}:</div>
                <div>${decrypted}</div>
            `;
            
            // 点击结果项应用该密钥
            resultItem.addEventListener('click', () => {
                // 设置密钥
                caesarKey.value = key;
                
                // 重新显示结果突出当前选中项
                document.querySelectorAll('.result-item').forEach(item => {
                    if (parseInt(item.getAttribute('data-key')) === key) {
                        item.classList.add('highlighted');
                    } else {
                        item.classList.remove('highlighted');
                    }
                });
                
                // 更新输出
                caesarOutput.textContent = decrypted;
                caesarOutput.classList.add('highlight');
                setTimeout(() => {
                    caesarOutput.classList.remove('highlight');
                }, 1000);
            });
            
            resultsContainer.appendChild(resultItem);
        }
        
        // 显示暴力破解结果
        bruteforceResults.classList.add('show');
        
        // 添加到历史记录 - 使用当前设置的密钥作为结果
        const currentKey = parseInt(caesarKey.value);
        const currentResult = allResults.find(r => r.key === currentKey)?.text || "";
        addToHistory('caesar', 'bruteforce', text, currentResult, currentKey);
        
        // 平滑滚动到结果区域
        bruteforceResults.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 栅栏密码功能
    const railfenceInput = document.getElementById('railfence-input');
    const railfenceKey = document.getElementById('railfence-key');
    const railfenceOutput = document.getElementById('railfence-output');
    const railfenceEncryptBtn = document.getElementById('railfence-encrypt');
    const railfenceDecryptBtn = document.getElementById('railfence-decrypt');
    const railfenceVisualization = document.getElementById('railfence-visualization');
    const railContainer = railfenceVisualization.querySelector('.rail-container');
    
    // 栅栏加密
    railfenceEncryptBtn.addEventListener('click', () => {
        const text = railfenceInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_encrypt_text']);
            return;
        }
        
        const key = parseInt(railfenceKey.value);
        if (isNaN(key) || key < 2 || key > 10) {
            alert(translations[document.documentElement.lang]['rails_range_error']);
            return;
        }
        
        const { encrypted, matrix } = railFenceEncrypt(text, key);
        railfenceOutput.textContent = encrypted;
        railfenceOutput.classList.add('highlight');
        setTimeout(() => {
            railfenceOutput.classList.remove('highlight');
        }, 1000);
        
        // 显示栅栏可视化
        visualizeRailFence(matrix, railContainer);
        railfenceVisualization.classList.add('show');
        
        // 添加到历史记录
        addToHistory('railfence', 'encrypt', text, encrypted, key);
    });
    
    // 栅栏解密
    railfenceDecryptBtn.addEventListener('click', () => {
        const text = railfenceInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_decrypt_text']);
            return;
        }
        
        const key = parseInt(railfenceKey.value);
        if (isNaN(key) || key < 2 || key > 10) {
            alert(translations[document.documentElement.lang]['rails_range_error']);
            return;
        }
        
        const { decrypted, matrix } = railFenceDecrypt(text, key);
        railfenceOutput.textContent = decrypted;
        railfenceOutput.classList.add('highlight');
        setTimeout(() => {
            railfenceOutput.classList.remove('highlight');
        }, 1000);
        
        // 显示栅栏可视化
        visualizeRailFence(matrix, railContainer);
        railfenceVisualization.classList.add('show');
        
        // 添加到历史记录
        addToHistory('railfence', 'decrypt', text, decrypted, key);
    });
    
    // 凯撒密码实现
    function caesarCipher(text, shift) {
        return text.split('').map(char => {
            // 只处理字母
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                // 大写字母 (ASCII: 65-90)
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
                }
                // 小写字母 (ASCII: 97-122)
                else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
                }
            }
            // 非字母字符保持不变
            return char;
        }).join('');
    }
    
    // 栅栏密码加密
    function railFenceEncrypt(text, rails) {
        // 创建栅栏矩阵
        const fence = Array(rails).fill().map(() => Array(text.length).fill(''));
        
        let rail = 0;
        let direction = 1; // 1 表示向下，-1 表示向上
        
        // 填充栅栏
        for (let i = 0; i < text.length; i++) {
            fence[rail][i] = text[i];
            
            // 改变方向
            if (rail === 0) {
                direction = 1;
            } else if (rail === rails - 1) {
                direction = -1;
            }
            
            rail += direction;
        }
        
        // 读取加密文本
        let encrypted = '';
        for (let i = 0; i < rails; i++) {
            for (let j = 0; j < text.length; j++) {
                if (fence[i][j] !== '') {
                    encrypted += fence[i][j];
                }
            }
        }
        
        return { encrypted, matrix: fence };
    }
    
    // 栅栏密码解密
    function railFenceDecrypt(text, rails) {
        // 创建栅栏矩阵
        const fence = Array(rails).fill().map(() => Array(text.length).fill(''));
        
        // 标记栅栏路径
        let rail = 0;
        let direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            fence[rail][i] = '*'; // 标记需要填充的位置
            
            if (rail === 0) {
                direction = 1;
            } else if (rail === rails - 1) {
                direction = -1;
            }
            
            rail += direction;
        }
        
        // 填充密文
        let index = 0;
        for (let i = 0; i < rails; i++) {
            for (let j = 0; j < text.length; j++) {
                if (fence[i][j] === '*' && index < text.length) {
                    fence[i][j] = text[index++];
                }
            }
        }
        
        // 读取解密文本
        let decrypted = '';
        rail = 0;
        direction = 1;
        
        for (let i = 0; i < text.length; i++) {
            decrypted += fence[rail][i];
            
            if (rail === 0) {
                direction = 1;
            } else if (rail === rails - 1) {
                direction = -1;
            }
            
            rail += direction;
        }
        
        return { decrypted, matrix: fence };
    }
    
    // 栅栏可视化
    function visualizeRailFence(matrix, container) {
        container.innerHTML = '';
        
        for (let i = 0; i < matrix.length; i++) {
            const rail = document.createElement('div');
            rail.className = 'rail';
            
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('div');
                cell.className = 'rail-cell';
                
                if (matrix[i][j] !== '' && matrix[i][j] !== '*') {
                    cell.classList.add('filled');
                    cell.textContent = matrix[i][j];
                }
                
                rail.appendChild(cell);
            }
            
            container.appendChild(rail);
        }
    }
}); 
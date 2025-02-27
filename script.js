document.addEventListener('DOMContentLoaded', function() {
    // 确保页面加载时不显示通知
    const notification = document.getElementById('copy-notification');
    if (notification) {
        notification.classList.remove('show');
        // 添加一个隐藏样式，确保一开始完全不可见
        notification.style.transform = 'translateX(200%)';
    }
    
    // 语言切换功能
    const langToggle = document.getElementById('lang-toggle');
    const langSwitchWrapper = document.querySelector('.lang-switch-wrapper');
    
    // 移动端检测和优化
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
        // 添加触屏设备的交互优化
        enhanceMobileExperience();
    }
    
    // 窗口大小变化监听
    window.addEventListener('resize', function() {
        const isMobileNow = window.matchMedia('(max-width: 768px)').matches;
        if (isMobileNow) {
            enhanceMobileExperience();
        }
    });
    
    // 移动端交互优化函数
    function enhanceMobileExperience() {
        // 增加触摸反馈
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            if (!button.hasAttribute('data-touch-bound')) {
                button.setAttribute('data-touch-bound', 'true');
                
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            }
        });
        
        // 调整Tab页的触摸区域
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(tab => {
            if (!tab.hasAttribute('data-touch-bound')) {
                tab.setAttribute('data-touch-bound', 'true');
                tab.style.minHeight = '44px'; // 确保触摸区域足够大
            }
        });
        
        // 自动调整文本区域的高度
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            if (!textarea.hasAttribute('data-touch-bound')) {
                textarea.setAttribute('data-touch-bound', 'true');
                
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
                
                // 初始调整
                textarea.style.height = 'auto';
                textarea.style.height = (textarea.scrollHeight) + 'px';
            }
        });
    }
    
    const translations = {
        'en': {
            'title': 'Classical Cipher Tools',
            'subtitle': 'Implement encryption and decryption of Caesar cipher, Rail Fence cipher, and Monoalphabetic cipher',
            'caesar': 'Caesar Cipher',
            'railfence': 'Rail Fence Cipher',
            'monoalpha': 'Monoalphabetic Cipher',
            'playfair': 'Playfair Cipher',
            'input_text': 'Input Text',
            'characters': 'characters',
            'shift': 'Shift (1-25)',
            'rails': 'Rails (2-10)',
            'key': 'Key',
            'plaintext': 'Plaintext',
            'ciphertext': 'Ciphertext',
            'generate_key': 'Generate Key',
            'encrypt': 'Encrypt',
            'decrypt': 'Decrypt',
            'bruteforce': 'Brute Force',
            'result': 'Result:',
            'bruteforce_results': 'Brute Force Results:',
            'rail_visualization': 'Rail Fence Visualization:',
            'matrix': 'Matrix',
            'filler_char': 'Filler Character',
            'letter_pairs': 'Letter Pairs',
            'history': 'History',
            'footer_text': 'Caesar Cipher, Rail Fence Cipher, Monoalphabetic Cipher & Playfair Cipher',
            'copied': 'Copied to clipboard',
            'click_to_close': 'Click × or outside to close',
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
            'enter_key': 'Please enter a 26-letter key',
            'enter_playfair_key': 'Please enter a keyword for the Playfair cipher',
            'invalid_key': 'Key must contain all 26 letters of the alphabet (no duplicates)',
            'shift_range_error': 'Shift must be an integer between 1 and 25',
            'rails_range_error': 'Rails must be an integer between 2 and 10',
            'reliability_score': 'Reliability Score',
            'sort_by_score': 'Sort by Score',
            'sort_by_key': 'Sort by Key',
            'copy': 'Copy',
            'letterFreqScore': 'Letter Frequency',
            'wordFreqScore': 'Common Words',
            'wordLengthScore': 'Word Length',
            'commonWordsFound': 'Common words found',
            'scoreDetails': 'Score Details',
            'viewDetails': 'View Details',
            'hideDetails': 'Hide Details',
            'enhanced_analysis': 'Enhanced Analysis',
            'common_words_library': 'Common Words Library',
            'view_common_words': 'View Common Words',
            'word': 'Word',
            'frequency': 'Frequency',
            'type': 'Type',
            'custom': 'Custom',
            'default': 'Default',
            'add_word': 'Add',
            'word_added': 'Word added successfully',
            'word_exists': 'This word already exists in the library',
            'word_letters_only': 'Words can only contain letters',
            'confirm_delete_word': 'Are you sure you want to delete this word?',
            'no_words_found': 'No words found',
            'adjust_weight': 'Adjust Weight',
            'weight_tooltip': 'Higher weight = greater impact on reliability score',
            'playfair_note': 'Note: In Playfair cipher, I and J are considered as the same letter',
            'same_row': 'Same Row',
            'same_column': 'Same Column',
            'rectangle': 'Rectangle'
        },
        'zh': {
            'title': '古典密码工具',
            'subtitle': '实现凯撒密码、栅栏密码和单字母替换密码的加解密',
            'caesar': '凯撒密码',
            'railfence': '栅栏密码',
            'monoalpha': '单字母替换密码',
            'playfair': 'Playfair密码',
            'input_text': '输入文本',
            'characters': '个字符',
            'shift': '位移量 (1-25)',
            'rails': '栏数 (2-10)',
            'key': '密钥',
            'plaintext': '明文',
            'ciphertext': '密文',
            'generate_key': '生成密钥',
            'encrypt': '加密',
            'decrypt': '解密',
            'bruteforce': '暴力破解',
            'result': '结果：',
            'bruteforce_results': '暴力破解结果：',
            'rail_visualization': '栅栏可视化：',
            'matrix': '矩阵',
            'filler_char': '填充字符',
            'letter_pairs': '字母对',
            'history': '历史记录',
            'footer_text': '凯撒密码, 栅栏密码, 单字母替换密码 & Playfair密码',
            'copied': '已复制到剪贴板',
            'click_to_close': '点击×或外部区域关闭',
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
            'enter_key': '请输入26个字母的密钥',
            'enter_playfair_key': '请输入Playfair密码的关键词',
            'invalid_key': '密钥必须包含所有26个字母（不能重复）',
            'shift_range_error': '位移量必须是1到25之间的整数',
            'rails_range_error': '栏数必须是2到10之间的整数',
            'reliability_score': '可靠性评分',
            'sort_by_score': '按评分排序',
            'sort_by_key': '按密钥排序',
            'copy': '复制',
            'letterFreqScore': '字母频率',
            'wordFreqScore': '常用词',
            'wordLengthScore': '单词长度',
            'commonWordsFound': '发现的常用词',
            'scoreDetails': '评分详情',
            'viewDetails': '查看详情',
            'hideDetails': '隐藏详情',
            'enhanced_analysis': '增强分析',
            'common_words_library': '常用词库',
            'view_common_words': '查看常用词',
            'word': '单词',
            'frequency': '频率',
            'type': '类型',
            'custom': '自定义',
            'default': '默认',
            'add_word': '添加',
            'word_added': '添加成功',
            'word_exists': '该单词已存在于词库中',
            'word_letters_only': '单词只能包含字母',
            'confirm_delete_word': '确定要删除这个单词吗？',
            'no_words_found': '未找到单词',
            'adjust_weight': '调整权重',
            'weight_tooltip': '权重越高 = 对可靠性评分的影响越大',
            'playfair_note': '注意：在Playfair密码中，I和J被视为同一个字母',
            'same_row': '同一行',
            'same_column': '同一列',
            'rectangle': '矩形规则'
        }
    };
    
    // 用户自定义的常用词 (存储在本地)
    let userDefinedCommonWords = JSON.parse(localStorage.getItem('user-common-words')) || {};
    
    // 自定义词的默认权重值
    const DEFAULT_CUSTOM_WORD_WEIGHT = 0.1;
    
    // 添加英语字母频率数据 (基于Peter Norvig的分析)
    const englishLetterFreq = {
        'e': 0.1202, 't': 0.0910, 'a': 0.0812, 'o': 0.0768,
        'n': 0.0695, 's': 0.0628, 'r': 0.0602, 'h': 0.0592, 'd': 0.0432,
        'l': 0.0398, 'u': 0.0288, 'c': 0.0271, 'm': 0.0261, 'f': 0.0230,
        'p': 0.0211, 'y': 0.0209, 'w': 0.0203, 'g': 0.0199, 'b': 0.0154,
        'v': 0.0106, 'k': 0.0074, 'x': 0.0020, 'j': 0.0015, 'q': 0.0010,
        'z': 0.0007
    };
    
    // 添加英语常用词频率数据 (基于Google Books数据)
    const englishCommonWords = {
        'the': 0.0714, 'of': 0.0416, 'and': 0.0304, 'to': 0.0260, 'in': 0.0227,
        'is': 0.0113, 'that': 0.0108, 'for': 0.0088, 'it': 0.0077,
        'as': 0.0077, 'was': 0.0074, 'with': 0.0070, 'be': 0.0065, 'by': 0.0063,
        'on': 0.0062, 'not': 0.0061, 'he': 0.0055, 'this': 0.0051,
        'are': 0.0050, 'or': 0.0049, 'his': 0.0049, 'from': 0.0047, 'at': 0.0046,
        'which': 0.0042, 'but': 0.0038, 'have': 0.0037, 'an': 0.0037, 'had': 0.0035,
        'they': 0.0033, 'you': 0.0031, 'were': 0.0031, 'their': 0.0029, 'one': 0.0029,
        'all': 0.0028, 'we': 0.0028, 'can': 0.0022, 'her': 0.0022, 'has': 0.0022,
        'there': 0.0022, 'been': 0.0022, 'if': 0.0021, 'more': 0.0021, 'when': 0.0020,
        'will': 0.0020, 'would': 0.0020, 'who': 0.0020, 'so': 0.0019, 'no': 0.0019,
        // 添加更多常用词 (基于图片中的频率数据)
        'your': 0.0019, 'them': 0.0018, 'she': 0.0018, 'now': 0.0018, 'out': 0.0018,
        'into': 0.0017, 'about': 0.0017, 'time': 0.0017, 'up': 0.0017, 'could': 0.0016,
        'year': 0.0016, 'my': 0.0016, 'than': 0.0016, 'first': 0.0016, 'some': 0.0016,
        'new': 0.0015, 'very': 0.0015, 'through': 0.0015, 'after': 0.0015, 'down': 0.0015,
        'should': 0.0015, 'because': 0.0015, 'each': 0.0015, 'just': 0.0014, 'many': 0.0014,
        'good': 0.0014, 'me': 0.0014, 'say': 0.0014, 'our': 0.0014, 'how': 0.0014,
        'get': 0.0014, 'most': 0.0014, 'know': 0.0014, 'these': 0.0014, 'over': 0.0014,
        'like': 0.0014, 'may': 0.0014, 'then': 0.0014, 'other': 0.0014, 'what': 0.0014,
        'two': 0.0014, 'any': 0.0013, 'only': 0.0013, 'do': 0.0013, 'make': 0.0013,
        'also': 0.0013, 'did': 0.0013, 'its': 0.0013, 'between': 0.0012, 'before': 0.0012
    };
    
    // 添加英语单词长度分布数据 (基于用户提供的更新数据)
    const englishWordLengthFreq = {
        1: 0.0299, 2: 0.1765, 3: 0.2051, 4: 0.1479, 5: 0.1070,
        6: 0.0839, 7: 0.0794, 8: 0.0594, 9: 0.0444, 10: 0.0308,
        11: 0.0176, 12: 0.0096, 13: 0.0052, 14: 0.0022, 15: 0.0008,
        16: 0.0002, 17: 0.0001, 18: 0.00004, 19: 0.00001, 20: 0.00001
    };
    
    // 计算文本的可靠性评分 (增强版)
    function calculateReliabilityScore(text) {
        if (!text || text.trim().length === 0) return 0;
        
        // 字母频率分析权重
        const LETTER_FREQ_WEIGHT = 0.5;
        // 常用词频率分析权重
        const WORD_FREQ_WEIGHT = 0.5;
        
        // 步骤1: 字母频率分析 (与原有逻辑相同)
        const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, '');
        if (lettersOnly.length === 0) return 0;
        
        const letterFreqMap = {};
        for (let char of lettersOnly) {
            letterFreqMap[char] = (letterFreqMap[char] || 0) + 1;
        }
        
        for (let char in letterFreqMap) {
            letterFreqMap[char] /= lettersOnly.length;
        }
        
        let letterFreqScore = 0;
        for (let char in englishLetterFreq) {
            const observed = letterFreqMap[char] || 0;
            const expected = englishLetterFreq[char];
            letterFreqScore += Math.pow(observed - expected, 2);
        }
        
        letterFreqScore = Math.sqrt(letterFreqScore);
        // 转换为0-100分 (越高越匹配)
        letterFreqScore = Math.max(0, Math.min(100, Math.round((1 - letterFreqScore) * 100)));
        
        // 步骤2: 常用词频率分析
        // 提取文本中的单词
        const words = text.toLowerCase().match(/[a-z]+/g) || [];
        if (words.length === 0) return letterFreqScore * LETTER_FREQ_WEIGHT;
        
        // 统计单词出现频率
        const wordFreqMap = {};
        const totalWords = words.length;
        
        for (let word of words) {
            wordFreqMap[word] = (wordFreqMap[word] || 0) + 1;
        }
        
        for (let word in wordFreqMap) {
            wordFreqMap[word] /= totalWords;
        }
        
        // 合并默认词库和用户自定义词库
        const combinedWordLibrary = { ...englishCommonWords, ...userDefinedCommonWords };
        
        // 计算常用词匹配度 (找出文本中包含的常用词)
        let wordFreqScore = 0;
        let commonWordsFound = 0;
        let commonWordsFoundList = [];
        let customWordsFound = 0;
        
        for (let word in combinedWordLibrary) {
            if (wordFreqMap[word]) {
                const observed = wordFreqMap[word];
                const expected = combinedWordLibrary[word];
                const isCustomWord = userDefinedCommonWords[word] !== undefined;
                
                // 对于自定义词，根据其实际权重值来提高其对评分的影响
                // 权重越高，影响越大（权重值通常在0.001-0.15之间）
                // 转换为10-150倍的影响力
                const wordImportance = isCustomWord ? (expected * 1000) : 1;
                
                // 差异的计算考虑词的重要性
                wordFreqScore += (Math.pow(observed - expected, 2) * (1 - expected)) / wordImportance;
                
                // 根据词的重要性增加计数
                commonWordsFound += isCustomWord ? Math.min(5, Math.ceil(expected * 30)) : 1;
                
                if (isCustomWord) {
                    customWordsFound++;
                }
                
                commonWordsFoundList.push(word);
            }
        }
        
        // 如果找到常用词，计算加权平均差异
        if (commonWordsFound > 0) {
            wordFreqScore = wordFreqScore / commonWordsFound;
            // 根据找到的常用词数量调整分数
            const coverageBonus = Math.min(1, commonWordsFound / 15); // 如果找到15个或更多常用词，获得满分奖励
            // 增加用户自定义词的奖励
            const customWordsBonus = customWordsFound > 0 ? (1 + (customWordsFound * 0.2)) : 1;
            
            wordFreqScore = Math.max(0, Math.min(100, Math.round((1 - wordFreqScore) * 100 * (0.5 + 0.5 * coverageBonus) * customWordsBonus)));
        } else {
            wordFreqScore = 0; // 没有找到常用词，得分为0
        }
        
        // 计算最终加权分数 (各项指标按权重组合)
        const finalScore = Math.round(
            letterFreqScore * LETTER_FREQ_WEIGHT +
            wordFreqScore * WORD_FREQ_WEIGHT
        );
        
        return finalScore;
    }
    
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
                const isRailFence = typeElement.innerHTML.includes('fa-bars');
                const isMonoalpha = typeElement.innerHTML.includes('fa-random');
                const isPlayfair = typeElement.innerHTML.includes('fa-th');
                const isEncrypt = typeElement.innerHTML.includes('加密') || typeElement.innerHTML.includes('Encrypt');
                const isDecrypt = typeElement.innerHTML.includes('解密') || typeElement.innerHTML.includes('Decrypt');
                const isBruteforce = typeElement.innerHTML.includes('暴力破解') || typeElement.innerHTML.includes('Brute Force');
                
                let newText = '';
                if (isCaesar) {
                    newText += `<i class="fas fa-key"></i> ${translations[lang]['caesar']} `;
                } else if (isRailFence) {
                    newText += `<i class="fas fa-bars"></i> ${translations[lang]['railfence']} `;
                } else if (isMonoalpha) {
                    newText += `<i class="fas fa-random"></i> ${translations[lang]['monoalpha']} `;
                } else if (isPlayfair) {
                    newText += `<i class="fas fa-th"></i> ${translations[lang]['playfair']} `;
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
        
        // 确保通知元素存在
        if (!notification) return;
        
        // 先移除可能存在的show类，以防止刷新页面时通知仍然显示
        notification.classList.remove('show');
        
        // 延迟一下再添加show类，确保DOM完全加载并且之前的动画已经结束
        setTimeout(() => {
            notification.classList.add('show');
            
            // 设置一个定时器在2秒后隐藏通知
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }, 10);
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
    
    // 加解密反转按钮功能
    function setupSwapButton(swapButtonId, encryptButtonId, decryptButtonId) {
        const swapButton = document.getElementById(swapButtonId);
        const encryptButton = document.getElementById(encryptButtonId);
        const decryptButton = document.getElementById(decryptButtonId);
        
        if (!swapButton || !encryptButton || !decryptButton) return;
        
        swapButton.addEventListener('click', function() {
            // 获取输出内容
            const outputId = encryptButtonId.split('-')[0] + '-output';
            const outputElement = document.getElementById(outputId);
            const outputText = outputElement.textContent.trim();
            
            // 获取输入区域
            const inputId = encryptButtonId.split('-')[0] + '-input';
            const inputElement = document.getElementById(inputId);
            
            // 如果有输出结果，将其设置到输入区域
            if (outputText) {
                inputElement.value = outputText;
                // 触发输入事件以更新字符计数
                inputElement.dispatchEvent(new Event('input'));
                // 清空输出
                outputElement.textContent = '';
                
                // 添加输入区域的高亮效果
                inputElement.classList.add('highlight-input');
                setTimeout(() => {
                    inputElement.classList.remove('highlight-input');
                }, 800);
            }
        });
    }
    
    // 设置加解密反转按钮
    setupSwapButton('caesar-swap', 'caesar-encrypt', 'caesar-decrypt');
    setupSwapButton('railfence-swap', 'railfence-encrypt', 'railfence-decrypt');
    
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
            let typeText = '';
            
            if (item.type === 'caesar') {
                typeText = translations[lang]['caesar'];
            } else if (item.type === 'railfence') {
                typeText = translations[lang]['railfence'];
            } else if (item.type === 'monoalpha') {
                typeText = translations[lang]['monoalpha'];
            } else if (item.type === 'playfair') {
                typeText = translations[lang]['playfair'];
            }
            
            let operationText = '';
            if (item.operation === 'encrypt') {
                operationText = translations[lang]['encrypt'];
            } else if (item.operation === 'decrypt') {
                operationText = translations[lang]['decrypt'];
            } else {
                operationText = translations[lang]['bruteforce'];
            }
            
            let iconClass = 'fa-key';
            if (item.type === 'railfence') {
                iconClass = 'fa-bars';
            } else if (item.type === 'monoalpha') {
                iconClass = 'fa-random';
            } else if (item.type === 'playfair') {
                iconClass = 'fa-th';
            }
            
            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="history-type">
                        <i class="fas ${iconClass}"></i>
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
                
                // 特殊处理Playfair
                if (item.type === 'playfair') {
                    updatePlayfairMatrix(item.key);
                }
                
                // 如果是凯撒暴力破解，则点击暴力破解按钮
                if (item.type === 'caesar' && item.operation === 'bruteforce') {
                    document.getElementById('caesar-bruteforce').click();
                }
                // 单字母替换暴力破解
                else if (item.type === 'monoalpha' && item.operation === 'bruteforce') {
                    document.getElementById('monoalpha-bruteforce').click();
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
        
        // 添加排序控制按钮
        const sortControls = document.createElement('div');
        sortControls.className = 'sort-controls';
        sortControls.innerHTML = `
            <button class="sort-btn sort-by-score">${translations[document.documentElement.lang]['sort_by_score']}</button>
            <button class="sort-btn sort-by-key">${translations[document.documentElement.lang]['sort_by_key']}</button>
        `;
        resultsContainer.appendChild(sortControls);
        
        // 所有可能的结果
        let allResults = [];
        
        // 尝试所有可能的密钥（1-25）
        for (let key = 1; key <= 25; key++) {
            const decrypted = caesarCipher(text, 26 - key);
            const score = calculateReliabilityScore(decrypted);
            allResults.push({ key, text: decrypted, score });
        }
        
        // 默认按照评分排序
        allResults.sort((a, b) => b.score - a.score);
        
        // 渲染结果
        function renderResults() {
            // 清除旧结果（保留排序控制按钮）
            const sortControlsElement = resultsContainer.querySelector('.sort-controls');
            resultsContainer.innerHTML = '';
            resultsContainer.appendChild(sortControlsElement);
            
            allResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.setAttribute('data-key', result.key);
                resultItem.setAttribute('data-score', result.score);
                
                // 如果是当前选择的密钥，突出显示
                if (parseInt(caesarKey.value) === result.key) {
                    resultItem.classList.add('highlighted');
                }
                
                // 计算详细的可靠性评分组件
                const detailedScore = getDetailedReliabilityScore(result.text);
                
                resultItem.innerHTML = `
                    <div class="result-header">
                        <div class="key-label">${translations[document.documentElement.lang]['key_label']} ${result.key}:</div>
                        <div class="score-label">${translations[document.documentElement.lang]['reliability_score']}: ${result.score}</div>
                        <div class="score-details-toggle"><i class="fas fa-info-circle"></i></div>
                    </div>
                    <div class="score-details" style="display: none;">
                        <div class="score-component">
                            <span class="component-label">🔤 ${translations[document.documentElement.lang].letterFreqScore || 'Letter Frequency'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.letterFreqScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.letterFreqScore}</span>
                        </div>
                        <div class="score-component">
                            <span class="component-label">📝 ${translations[document.documentElement.lang].wordFreqScore || 'Common Words'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.wordFreqScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.wordFreqScore}</span>
                        </div>
                        <div class="common-words-found">
                            <span>${translations[document.documentElement.lang].commonWordsFound || 'Common words found'}: ${detailedScore.commonWordsFound}</span>
                            ${detailedScore.commonWordsFoundList && detailedScore.commonWordsFoundList.length > 0 
                                ? `<div class="common-words-tags">
                                    ${detailedScore.commonWordsFoundList.map(word => 
                                        `<span class="word-tag">${word}</span>`).join('')}
                                </div>` 
                                : ''}
                        </div>
                    </div>
                    <div class="result-text">${result.text}</div>
                `;
                
                // 点击结果项应用该密钥
                resultItem.addEventListener('click', function(e) {
                    // 如果点击的是详情切换按钮，则只显示/隐藏详情
                    if (e.target.closest('.score-details-toggle')) {
                        const detailsElement = this.querySelector('.score-details');
                        if (detailsElement) {
                            detailsElement.style.display = 
                                detailsElement.style.display === 'none' ? 'block' : 'none';
                        }
                        return;
                    }
                    
                    // 设置密钥
                    caesarKey.value = result.key;
                    
                    // 重新显示结果突出当前选中项
                    document.querySelectorAll('.result-item').forEach(item => {
                        if (parseInt(item.getAttribute('data-key')) === result.key) {
                            item.classList.add('highlighted');
                        } else {
                            item.classList.remove('highlighted');
                        }
                    });
                    
                    // 更新输出
                    caesarOutput.textContent = result.text;
                    caesarOutput.classList.add('highlight');
                    setTimeout(() => {
                        caesarOutput.classList.remove('highlight');
                    }, 1000);
                });
                
                resultsContainer.appendChild(resultItem);
            });
        }
        
        // 渲染初始结果
        renderResults();
        
        // 添加排序事件监听器
        document.querySelector('.sort-by-score').addEventListener('click', () => {
            allResults.sort((a, b) => b.score - a.score);
            renderResults();
        });
        
        document.querySelector('.sort-by-key').addEventListener('click', () => {
            allResults.sort((a, b) => a.key - b.key);
            renderResults();
        });
        
        // 显示暴力破解结果
        bruteforceResults.classList.add('show');
        
        // 添加到历史记录 - 使用当前设置的密钥作为结果
        const currentKey = parseInt(caesarKey.value);
        const currentResult = allResults.find(r => r.key === currentKey)?.text || "";
        addToHistory('caesar', 'bruteforce', text, currentResult, currentKey);
        
        // 平滑滚动到结果区域
        bruteforceResults.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 获取详细的可靠性评分组件
    function getDetailedReliabilityScore(text) {
        if (!text || text.trim().length === 0) {
            return {
                letterFreqScore: 0,
                wordFreqScore: 0,
                commonWordsFound: 0
            };
        }
        
        // 字母频率分析
        const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, '');
        if (lettersOnly.length === 0) {
            return {
                letterFreqScore: 0,
                wordFreqScore: 0,
                commonWordsFound: 0
            };
        }
        
        const letterFreqMap = {};
        for (let char of lettersOnly) {
            letterFreqMap[char] = (letterFreqMap[char] || 0) + 1;
        }
        
        for (let char in letterFreqMap) {
            letterFreqMap[char] /= lettersOnly.length;
        }
        
        let letterFreqScore = 0;
        for (let char in englishLetterFreq) {
            const observed = letterFreqMap[char] || 0;
            const expected = englishLetterFreq[char];
            letterFreqScore += Math.pow(observed - expected, 2);
        }
        
        letterFreqScore = Math.sqrt(letterFreqScore);
        // 转换为0-100分 (越高越匹配)
        letterFreqScore = Math.max(0, Math.min(100, Math.round((1 - letterFreqScore) * 100)));
        
        // 常用词频率分析
        const words = text.toLowerCase().match(/[a-z]+/g) || [];
        if (words.length === 0) {
            return {
                letterFreqScore,
                wordFreqScore: 0,
                commonWordsFound: 0
            };
        }
        
        const wordFreqMap = {};
        const totalWords = words.length;
        
        for (let word of words) {
            wordFreqMap[word] = (wordFreqMap[word] || 0) + 1;
        }
        
        for (let word in wordFreqMap) {
            wordFreqMap[word] /= totalWords;
        }
        
        // 合并默认词库和用户自定义词库，用户词库优先级更高
        const combinedWordLibrary = { ...englishCommonWords, ...userDefinedCommonWords };
        
        let wordFreqScore = 0;
        let commonWordsFound = 0;
        let commonWordsFoundList = [];
        let customWordsFound = 0;
        
        for (let word in combinedWordLibrary) {
            if (wordFreqMap[word]) {
                const observed = wordFreqMap[word];
                const expected = combinedWordLibrary[word];
                const isCustomWord = userDefinedCommonWords[word] !== undefined;
                
                // 对于自定义词，根据其实际权重值来提高其对评分的影响
                // 权重越高，影响越大（权重值通常在0.001-0.15之间）
                // 转换为10-150倍的影响力
                const wordImportance = isCustomWord ? (expected * 1000) : 1;
                
                // 差异的计算考虑词的重要性
                wordFreqScore += (Math.pow(observed - expected, 2) * (1 - expected)) / wordImportance;
                
                // 根据词的重要性增加计数
                commonWordsFound += isCustomWord ? Math.min(5, Math.ceil(expected * 30)) : 1;
                
                if (isCustomWord) {
                    customWordsFound++;
                }
                
                commonWordsFoundList.push(word);
            }
        }
        
        if (commonWordsFound > 0) {
            wordFreqScore = wordFreqScore / commonWordsFound;
            
            // 增加用户自定义词的奖励
            const customWordsBonus = customWordsFound > 0 ? (1 + (customWordsFound * 0.2)) : 1;
            const coverageBonus = Math.min(1, commonWordsFound / 15);
            
            wordFreqScore = Math.max(0, Math.min(100, Math.round((1 - wordFreqScore) * 100 * (0.5 + 0.5 * coverageBonus) * customWordsBonus)));
        } else {
            wordFreqScore = 0;
        }
        
        return {
            letterFreqScore,
            wordFreqScore,
            commonWordsFound,
            commonWordsFoundList
        };
    }
    
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
    
    // 栅栏密码功能
    const railfenceInput = document.getElementById('railfence-input');
    const railfenceKey = document.getElementById('railfence-key');
    const railfenceOutput = document.getElementById('railfence-output');
    const railfenceEncryptBtn = document.getElementById('railfence-encrypt');
    const railfenceDecryptBtn = document.getElementById('railfence-decrypt');
    const railfenceBruteforceBtn = document.getElementById('railfence-bruteforce');
    const railfenceBruteforceResults = document.getElementById('railfence-bruteforce-results');
    const railfenceBruteforceContainer = railfenceBruteforceResults.querySelector('.results-container');
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
        
        // 隐藏暴力破解结果
        railfenceBruteforceResults.classList.remove('show');
        
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
        
        // 隐藏暴力破解结果
        railfenceBruteforceResults.classList.remove('show');
        
        // 添加到历史记录
        addToHistory('railfence', 'decrypt', text, decrypted, key);
    });
    
    // 栅栏暴力破解
    railfenceBruteforceBtn.addEventListener('click', () => {
        const text = railfenceInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_bruteforce_text']);
            return;
        }
        
        railfenceBruteforceContainer.innerHTML = '';
        
        // 添加排序控制按钮
        const sortControls = document.createElement('div');
        sortControls.className = 'sort-controls';
        sortControls.innerHTML = `
            <button class="sort-btn sort-by-score">${translations[document.documentElement.lang]['sort_by_score']}</button>
            <button class="sort-btn sort-by-key">${translations[document.documentElement.lang]['sort_by_key']}</button>
        `;
        railfenceBruteforceContainer.appendChild(sortControls);
        
        // 所有可能的结果
        let allResults = [];
        
        // 尝试所有可能的栏数（2-10）
        for (let rails = 2; rails <= 10; rails++) {
            const { decrypted, matrix } = railFenceDecrypt(text, rails);
            const scoreResult = calculateRailfenceReliabilityScore(decrypted);
            allResults.push({ key: rails, text: decrypted, score: scoreResult.score, detailedScore: scoreResult, matrix });
        }
        
        // 默认按照评分排序
        allResults.sort((a, b) => b.score - a.score);
        
        // 渲染结果
        function renderRailfenceResults() {
            // 清除旧结果（保留排序控制按钮）
            const sortControlsElement = railfenceBruteforceContainer.querySelector('.sort-controls');
            railfenceBruteforceContainer.innerHTML = '';
            railfenceBruteforceContainer.appendChild(sortControlsElement);
            
            allResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.setAttribute('data-key', result.key);
                resultItem.setAttribute('data-score', result.score);
                
                // 如果是当前选择的密钥，突出显示
                if (parseInt(railfenceKey.value) === result.key) {
                    resultItem.classList.add('highlighted');
                }
                
                // 计算详细的可靠性评分组件
                const detailedScore = result.detailedScore;
                
                resultItem.innerHTML = `
                    <div class="result-header">
                        <div class="key-label">${translations[document.documentElement.lang]['rails']}: ${result.key}</div>
                        <div class="score-label">${translations[document.documentElement.lang]['reliability_score']}: ${result.score}</div>
                        <div class="score-details-toggle"><i class="fas fa-info-circle"></i></div>
                    </div>
                    <div class="score-details" style="display: none;">
                        <div class="score-component">
                            <span class="component-label">📏 ${translations[document.documentElement.lang].wordLengthScore || 'Word Length'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.wordLengthScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.wordLengthScore}</span>
                        </div>
                        <div class="score-component">
                            <span class="component-label">📝 ${translations[document.documentElement.lang].wordFreqScore || 'Common Words'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.wordFreqScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.wordFreqScore}</span>
                        </div>
                        <div class="common-words-found">
                            <span>${translations[document.documentElement.lang].commonWordsFound || 'Common words found'}: ${detailedScore.commonWordsFound}</span>
                            ${detailedScore.commonWordsFoundList && detailedScore.commonWordsFoundList.length > 0 
                                ? `<div class="common-words-tags">
                                    ${detailedScore.commonWordsFoundList.map(word => 
                                        `<span class="word-tag">${word}</span>`).join('')}
                                </div>` 
                                : ''}
                        </div>
                    </div>
                    <div class="result-text">${result.text}</div>
                `;
                
                // 点击结果项应用该密钥
                resultItem.addEventListener('click', function(e) {
                    // 如果点击的是详情切换按钮，则只显示/隐藏详情
                    if (e.target.closest('.score-details-toggle')) {
                        const detailsElement = this.querySelector('.score-details');
                        if (detailsElement) {
                            detailsElement.style.display = 
                                detailsElement.style.display === 'none' ? 'block' : 'none';
                        }
                        return;
                    }
                    
                    // 设置密钥
                    railfenceKey.value = result.key;
                    
                    // 重新显示结果突出当前选中项
                    document.querySelectorAll('.result-item').forEach(item => {
                        if (parseInt(item.getAttribute('data-key')) === result.key) {
                            item.classList.add('highlighted');
                        } else {
                            item.classList.remove('highlighted');
                        }
                    });
                    
                    // 更新输出
                    railfenceOutput.textContent = result.text;
                    railfenceOutput.classList.add('highlight');
                    setTimeout(() => {
                        railfenceOutput.classList.remove('highlight');
                    }, 1000);
                    
                    // 显示栅栏可视化
                    visualizeRailFence(result.matrix, railContainer);
                    railfenceVisualization.classList.add('show');
                });
                
                railfenceBruteforceContainer.appendChild(resultItem);
            });
        }
        
        // 渲染初始结果
        renderRailfenceResults();
        
        // 添加排序事件监听器
        document.querySelector('#railfence-bruteforce-results .sort-by-score').addEventListener('click', () => {
            allResults.sort((a, b) => b.score - a.score);
            renderRailfenceResults();
        });
        
        document.querySelector('#railfence-bruteforce-results .sort-by-key').addEventListener('click', () => {
            allResults.sort((a, b) => a.key - b.key);
            renderRailfenceResults();
        });
        
        // 显示暴力破解结果
        railfenceBruteforceResults.classList.add('show');
        railfenceVisualization.classList.remove('show');
        
        // 添加到历史记录 - 使用当前设置的密钥作为结果
        const currentKey = parseInt(railfenceKey.value);
        const currentResult = allResults.find(r => r.key === currentKey)?.text || "";
        addToHistory('railfence', 'bruteforce', text, currentResult, currentKey);
        
        // 平滑滚动到结果区域
        railfenceBruteforceResults.scrollIntoView({ behavior: 'smooth' });
    });
    
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
        
        // 根据文本长度添加类来自适应单元格大小
        container.classList.remove('long-text', 'very-long-text');
        const textLength = matrix[0].length;
        if (textLength > 50) {
            container.classList.add('very-long-text');
        } else if (textLength > 30) {
            container.classList.add('long-text');
        }
        
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
    
    // 栅栏密码专用的评分计算函数 - 使用单词长度而非字母频率
    function calculateRailfenceReliabilityScore(text) {
        if (!text || text.trim().length === 0) return 0;
        
        // 单词长度分析权重
        const WORD_LENGTH_WEIGHT = 0.5;
        // 常用词频率分析权重
        const WORD_FREQ_WEIGHT = 0.5;
        
        // 提取文本中的单词
        const words = text.toLowerCase().match(/[a-z]+/g) || [];
        if (words.length === 0) return 0;
        
        // 步骤1: 单词长度分析
        const wordLengthDistribution = {};
        for (let i = 1; i <= 20; i++) {
            wordLengthDistribution[i] = 0;
        }
        
        // 统计文本中各长度单词的数量
        for (let word of words) {
            const len = Math.min(20, word.length);  // 限制最大长度为20
            wordLengthDistribution[len] = (wordLengthDistribution[len] || 0) + 1;
        }
        
        // 转换为比例
        for (let len in wordLengthDistribution) {
            wordLengthDistribution[len] /= words.length;
        }
        
        // 计算与英语单词长度分布的差异
        let wordLengthScore = 0;
        for (let len in englishWordLengthFreq) {
            const observed = wordLengthDistribution[len] || 0;
            const expected = englishWordLengthFreq[len];
            wordLengthScore += Math.pow(observed - expected, 2);
        }
        
        wordLengthScore = Math.sqrt(wordLengthScore);
        // 转换为0-100分 (越高越匹配)
        wordLengthScore = Math.max(0, Math.min(100, Math.round((1 - wordLengthScore) * 100)));
        
        // 步骤2: 调用现有的词频分析 (从原有函数获取)
        const wordFreqAnalysis = getDetailedReliabilityScore(text);
        const wordFreqScore = wordFreqAnalysis.wordFreqScore;
        
        // 计算最终加权分数
        const finalScore = Math.round(
            wordLengthScore * WORD_LENGTH_WEIGHT +
            wordFreqScore * WORD_FREQ_WEIGHT
        );
        
        return {
            score: finalScore,
            wordLengthScore: wordLengthScore,
            wordFreqScore: wordFreqScore,
            commonWordsFound: wordFreqAnalysis.commonWordsFound,
            commonWordsFoundList: wordFreqAnalysis.commonWordsFoundList
        };
    }
    
    // 初始化常用词模态框功能
    function initCommonWordsModal() {
        const modal = document.getElementById('common-words-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const viewBtnCaesar = document.getElementById('view-common-words-btn');
        const viewBtnRailFence = document.getElementById('view-common-words-btn-rf');
        const searchInput = document.getElementById('search-common-words');
        const addButton = document.getElementById('add-common-word');
        const newWordInput = document.getElementById('new-common-word');
        const wordsContainer = document.getElementById('common-words-container');
        
        // 打开模态框
        function openModal() {
            modal.style.display = 'block';
            renderCommonWords();
            searchInput.focus();
            
            // 显示关闭提示
            const notification = document.getElementById('copy-notification');
            if (notification) {
                const closeText = translations[document.documentElement.lang]['click_to_close'];
                notification.innerHTML = `<i class="fas fa-info-circle"></i> ${closeText}`;
                notification.classList.add('show');
                
                // 3秒后自动隐藏提示
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
        }
        
        // 关闭模态框
        function closeModal() {
            modal.style.display = 'none';
        }
        
        // 搜索功能
        searchInput.addEventListener('input', renderCommonWords);
        
        // 添加新词
        addButton.addEventListener('click', addNewCommonWord);
        newWordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNewCommonWord();
            }
        });
        
        function renderCommonWords() {
            wordsContainer.innerHTML = '';
            const searchTerm = searchInput.value.toLowerCase();
            
            // 合并默认词库和用户自定义词库
            const allWords = { ...englishCommonWords, ...userDefinedCommonWords };
            
            // 转换为数组以便排序
            const wordArray = Object.entries(allWords).filter(([word]) => {
                return word.includes(searchTerm);
            });
            
            // 按频率排序 (从高到低)
            wordArray.sort((a, b) => b[1] - a[1]);
            
            // 渲染列表
            wordArray.forEach(([word, frequency]) => {
                const isCustom = userDefinedCommonWords[word] !== undefined;
                
                const wordItem = document.createElement('div');
                wordItem.className = 'common-word-item';
                
                // Basic word info
                const wordInfo = document.createElement('div');
                wordInfo.className = 'word-column';
                wordInfo.textContent = word;
                
                // Type indicator
                const typeElement = document.createElement('div');
                typeElement.className = 'type-column';
                const typeSpan = document.createElement('span');
                typeSpan.className = `word-type ${isCustom ? 'word-type-custom' : 'word-type-default'}`;
                typeSpan.textContent = isCustom ? 
                    (translations[document.documentElement.lang].custom || 'Custom') : 
                    (translations[document.documentElement.lang].default || 'Default');
                typeElement.appendChild(typeSpan);
                
                // Frequency display/control
                const freqElement = document.createElement('div');
                freqElement.className = 'frequency-column';
                
                if (isCustom) {
                    // For custom words, show adjustment slider
                    const freqControl = document.createElement('div');
                    freqControl.className = 'frequency-control';
                    
                    // Add label with tooltip
                    const freqLabel = document.createElement('span');
                    freqLabel.className = 'freq-label';
                    freqLabel.title = translations[document.documentElement.lang].weight_tooltip || 'Higher weight = greater impact on reliability score';
                    freqLabel.innerHTML = '<i class="fas fa-info-circle"></i>';
                    
                    const slider = document.createElement('input');
                    slider.type = 'range';
                    slider.className = 'frequency-slider';
                    slider.min = '0.001';
                    slider.max = '0.15';
                    slider.step = '0.001';
                    slider.value = frequency.toString();
                    slider.title = translations[document.documentElement.lang].adjust_weight || 'Adjust Weight';
                    
                    const valueDisplay = document.createElement('span');
                    valueDisplay.className = 'frequency-value';
                    valueDisplay.textContent = frequency.toFixed(4);
                    
                    // Update value when slider changes
                    slider.addEventListener('input', function() {
                        const newValue = parseFloat(this.value);
                        valueDisplay.textContent = newValue.toFixed(4);
                        userDefinedCommonWords[word] = newValue;
                        localStorage.setItem('user-common-words', JSON.stringify(userDefinedCommonWords));
                    });
                    
                    freqControl.appendChild(freqLabel);
                    freqControl.appendChild(slider);
                    freqControl.appendChild(valueDisplay);
                    freqElement.appendChild(freqControl);
                } else {
                    // For default words, just show the value
                    freqElement.textContent = frequency.toFixed(4);
                }
                
                // Add elements to the word item
                wordItem.appendChild(wordInfo);
                wordItem.appendChild(freqElement);
                wordItem.appendChild(typeElement);
                
                if (isCustom) {
                    // 添加删除按钮
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-word-btn';
                    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                    deleteBtn.title = translations[document.documentElement.lang].delete || 'Delete';
                    
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        
                        if (confirm(translations[document.documentElement.lang].confirm_delete_word || 'Are you sure you want to delete this word?')) {
                            delete userDefinedCommonWords[word];
                            localStorage.setItem('user-common-words', JSON.stringify(userDefinedCommonWords));
                            renderCommonWords();
                        }
                    });
                    
                    wordItem.appendChild(deleteBtn);
                }
                
                wordsContainer.appendChild(wordItem);
            });
            
            // 如果没有结果，显示提示
            if (wordArray.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = translations[document.documentElement.lang].no_words_found || 'No words found';
                wordsContainer.appendChild(noResults);
            }
        }
        
        function addNewCommonWord() {
            const newWord = newWordInput.value.trim().toLowerCase();
            if (!newWord) return;
            
            // 验证输入只包含字母
            if (!/^[a-z]+$/.test(newWord)) {
                alert(translations[document.documentElement.lang].word_letters_only || 'Words can only contain letters');
                return;
            }
            
            // 如果已存在，提示用户
            if (englishCommonWords[newWord] || userDefinedCommonWords[newWord]) {
                alert(translations[document.documentElement.lang].word_exists || 'This word already exists in the library');
                return;
            }
            
            // 添加新词 - 给予高频率权重
            userDefinedCommonWords[newWord] = DEFAULT_CUSTOM_WORD_WEIGHT;
            
            // 保存到本地存储
            localStorage.setItem('user-common-words', JSON.stringify(userDefinedCommonWords));
            
            // 清空输入并重新渲染
            newWordInput.value = '';
            renderCommonWords();
            
            // 显示成功添加的通知
            const notification = document.createElement('div');
            notification.className = 'word-added-notification';
            notification.textContent = translations[document.documentElement.lang].word_added || 'Word added successfully';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            }, 10);
        }
        
        // 绑定事件
        viewBtnCaesar.addEventListener('click', openModal);
        viewBtnRailFence.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        
        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // 在DOMContentLoaded事件中初始化模态框
    initCommonWordsModal();
    
    // 单字母替换密码功能
    const monoalphaInput = document.getElementById('monoalpha-input');
    const monoalphaKey = document.getElementById('monoalpha-key');
    const monoalphaOutput = document.getElementById('monoalpha-output');
    const monoalphaEncryptBtn = document.getElementById('monoalpha-encrypt');
    const monoalphaDecryptBtn = document.getElementById('monoalpha-decrypt');
    const monoalphaBruteforceBtn = document.getElementById('monoalpha-bruteforce');
    const monoalphaBruteforceResults = document.getElementById('monoalpha-bruteforce-results');
    const monoalphaBruteforceContainer = monoalphaBruteforceResults.querySelector('.results-container');
    const generateKeyBtn = document.getElementById('generate-key-btn');
    const keyDisplay = document.getElementById('key-display');
    const monoalphaCopyBtn = document.getElementById('monoalpha-copy-btn');
    const viewCommonWordsBtnMa = document.getElementById('view-common-words-btn-ma');
    
    // 初始化字符计数器和按钮
    setupCharacterCounter('monoalpha-input', 'monoalpha-char-count');
    setupCopyButton('monoalpha-copy-btn', 'monoalpha-output');
    setupTextAreaActions(document.querySelector('#monoalpha .input-section'));
    setupSwapButton('monoalpha-swap', 'monoalpha-encrypt', 'monoalpha-decrypt');
    
    if (viewCommonWordsBtnMa) {
        viewCommonWordsBtnMa.addEventListener('click', () => {
            const modal = document.getElementById('common-words-modal');
            modal.style.display = 'block';
        });
    }
    
    // 生成随机密钥
    function generateRandomKey() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const shuffled = [...alphabet];
        
        // Fisher-Yates 洗牌算法
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled.join('').toUpperCase();
    }
    
    // 验证密钥是否有效
    function isValidKey(key) {
        if (!key || key.length !== 26) return false;
        
        // 检查是否包含所有26个字母且不重复
        const sortedKey = key.toLowerCase().split('').sort().join('');
        return sortedKey === 'abcdefghijklmnopqrstuvwxyz';
    }
    
    // 更新密钥显示
    function updateKeyDisplay(key) {
        keyDisplay.textContent = key;
    }
    
    // 生成随机密钥按钮
    generateKeyBtn.addEventListener('click', () => {
        const key = generateRandomKey();
        monoalphaKey.value = key;
        updateKeyDisplay(key);
    });
    
    // 密钥输入变化时更新显示
    monoalphaKey.addEventListener('input', function() {
        // 转换为大写
        this.value = this.value.toUpperCase();
        // 只允许字母
        this.value = this.value.replace(/[^A-Z]/g, '');
        
        updateKeyDisplay(this.value);
    });
    
    // 单字母替换加密
    function monoalphabeticEncrypt(text, key) {
        if (!text) return '';
        
        // 构建加密映射
        const plainAlphabet = 'abcdefghijklmnopqrstuvwxyz';
        const cipherAlphabet = key.toLowerCase();
        const encryptMap = {};
        
        for (let i = 0; i < 26; i++) {
            encryptMap[plainAlphabet[i]] = cipherAlphabet[i];
            // 同时处理大写字母
            encryptMap[plainAlphabet[i].toUpperCase()] = cipherAlphabet[i].toUpperCase();
        }
        
        // 加密文本
        return text.split('').map(char => {
            // 如果是字母则替换，否则保持不变
            return encryptMap[char] || char;
        }).join('');
    }
    
    // 单字母替换解密
    function monoalphabeticDecrypt(text, key) {
        if (!text) return '';
        
        // 构建解密映射
        const plainAlphabet = 'abcdefghijklmnopqrstuvwxyz';
        const cipherAlphabet = key.toLowerCase();
        const decryptMap = {};
        
        for (let i = 0; i < 26; i++) {
            decryptMap[cipherAlphabet[i]] = plainAlphabet[i];
            // 同时处理大写字母
            decryptMap[cipherAlphabet[i].toUpperCase()] = plainAlphabet[i].toUpperCase();
        }
        
        // 解密文本
        return text.split('').map(char => {
            // 如果是字母则替换，否则保持不变
            return decryptMap[char] || char;
        }).join('');
    }
    
    // 加密按钮
    monoalphaEncryptBtn.addEventListener('click', () => {
        const text = monoalphaInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_encrypt_text']);
            return;
        }
        
        const key = monoalphaKey.value.trim().toUpperCase();
        if (!key) {
            alert(translations[document.documentElement.lang]['enter_key']);
            return;
        }
        
        if (!isValidKey(key)) {
            alert(translations[document.documentElement.lang]['invalid_key']);
            return;
        }
        
        const encrypted = monoalphabeticEncrypt(text, key);
        monoalphaOutput.textContent = encrypted;
        monoalphaOutput.classList.add('highlight');
        setTimeout(() => {
            monoalphaOutput.classList.remove('highlight');
        }, 1000);
        
        // 添加到历史记录
        addToHistory('monoalpha', 'encrypt', text, encrypted, key);
    });
    
    // 解密按钮
    monoalphaDecryptBtn.addEventListener('click', () => {
        const text = monoalphaInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_decrypt_text']);
            return;
        }
        
        const key = monoalphaKey.value.trim().toUpperCase();
        if (!key) {
            alert(translations[document.documentElement.lang]['enter_key']);
            return;
        }
        
        if (!isValidKey(key)) {
            alert(translations[document.documentElement.lang]['invalid_key']);
            return;
        }
        
        const decrypted = monoalphabeticDecrypt(text, key);
        monoalphaOutput.textContent = decrypted;
        monoalphaOutput.classList.add('highlight');
        setTimeout(() => {
            monoalphaOutput.classList.remove('highlight');
        }, 1000);
        
        // 添加到历史记录
        addToHistory('monoalpha', 'decrypt', text, decrypted, key);
    });
    
    // 初始化：生成一个默认随机密钥
    document.addEventListener('DOMContentLoaded', function() {
        const key = generateRandomKey();
        monoalphaKey.value = key;
        updateKeyDisplay(key);
    });
    
    // 单字母替换暴力破解
    monoalphaBruteforceBtn.addEventListener('click', () => {
        const ciphertext = monoalphaInput.value.trim();
        if (!ciphertext) {
            alert(translations[document.documentElement.lang]['enter_bruteforce_text']);
            return;
        }
        
        monoalphaBruteforceContainer.innerHTML = '';
        
        // 添加排序控制按钮
        const sortControls = document.createElement('div');
        sortControls.className = 'sort-controls';
        sortControls.innerHTML = `
            <button class="sort-btn sort-by-score">${translations[document.documentElement.lang]['sort_by_score']}</button>
        `;
        monoalphaBruteforceContainer.appendChild(sortControls);
        
        // 开始暴力破解
        const results = monoalphabeticBruteforce(ciphertext);
        
        // 默认按照评分排序
        results.sort((a, b) => b.score - a.score);
        
        // 渲染结果
        function renderResults() {
            // 清除旧结果（保留排序控制按钮）
            const sortControlsElement = monoalphaBruteforceContainer.querySelector('.sort-controls');
            monoalphaBruteforceContainer.innerHTML = '';
            monoalphaBruteforceContainer.appendChild(sortControlsElement);
            
            // 限制显示结果数量，仅显示前10个
            const topResults = results.slice(0, 10);
            
            topResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.setAttribute('data-score', result.score);
                
                const plainKey = 'abcdefghijklmnopqrstuvwxyz';
                const cipherKey = result.key;
                
                // 构建密钥映射的视觉表示
                let keyMappingHTML = '<div class="key-mapping-display">';
                keyMappingHTML += '<div class="plaintext-row"><span>Plaintext:</span> <span class="alphabet">abcdefghijklmnopqrstuvwxyz</span></div>';
                keyMappingHTML += `<div class="ciphertext-row"><span>Ciphertext:</span> <span class="alphabet">${cipherKey}</span></div>`;
                keyMappingHTML += '</div>';
                
                // 计算详细的可靠性评分组件
                const detailedScore = result.detailedScore;
                
                resultItem.innerHTML = `
                    <div class="result-header">
                        <div class="key-label">${translations[document.documentElement.lang]['key_label']}</div>
                        <div class="score-label">${translations[document.documentElement.lang]['reliability_score']}: ${result.score}</div>
                        <div class="score-details-toggle"><i class="fas fa-info-circle"></i></div>
                    </div>
                    <div class="score-details" style="display: none;">
                        <div class="score-component">
                            <span class="component-label">🔤 ${translations[document.documentElement.lang].letterFreqScore || 'Letter Frequency'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.letterFreqScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.letterFreqScore}</span>
                        </div>
                        <div class="score-component">
                            <span class="component-label">📝 ${translations[document.documentElement.lang].wordFreqScore || 'Common Words'}:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${detailedScore.wordFreqScore}%"></div>
                            </div>
                            <span class="component-value">${detailedScore.wordFreqScore}</span>
                        </div>
                        <div class="common-words-found">
                            <span>${translations[document.documentElement.lang].commonWordsFound || 'Common words found'}: ${detailedScore.commonWordsFound}</span>
                            ${detailedScore.commonWordsFoundList && detailedScore.commonWordsFoundList.length > 0 
                                ? `<div class="common-words-tags">
                                    ${detailedScore.commonWordsFoundList.map(word => 
                                        `<span class="word-tag">${word}</span>`).join('')}
                                </div>` 
                                : ''}
                        </div>
                    </div>
                    ${keyMappingHTML}
                    <div class="result-text">${result.text}</div>
                    <button class="apply-key-btn">${translations[document.documentElement.lang]['apply'] || 'Apply Key'}</button>
                `;
                
                // 点击结果项应用该密钥
                const applyBtn = resultItem.querySelector('.apply-key-btn');
                applyBtn.addEventListener('click', function() {
                    // 设置密钥
                    monoalphaKey.value = result.key.toUpperCase();
                    updateKeyDisplay(result.key.toUpperCase());
                    
                    // 更新输出
                    monoalphaOutput.textContent = result.text;
                    monoalphaOutput.classList.add('highlight');
                    setTimeout(() => {
                        monoalphaOutput.classList.remove('highlight');
                    }, 1000);
                    
                    // 隐藏暴力破解结果
                    monoalphaBruteforceResults.classList.remove('show');
                });
                
                // 处理详情切换
                const detailsToggle = resultItem.querySelector('.score-details-toggle');
                const detailsElement = resultItem.querySelector('.score-details');
                
                detailsToggle.addEventListener('click', function() {
                    if (detailsElement.style.display === 'none') {
                        detailsElement.style.display = 'block';
                    } else {
                        detailsElement.style.display = 'none';
                    }
                });
                
                monoalphaBruteforceContainer.appendChild(resultItem);
            });
        }
        
        // 渲染初始结果
        renderResults();
        
        // 添加排序事件监听器
        document.querySelector('#monoalpha-bruteforce-results .sort-by-score').addEventListener('click', () => {
            results.sort((a, b) => b.score - a.score);
            renderResults();
        });
        
        // 显示暴力破解结果
        monoalphaBruteforceResults.classList.add('show');
        
        // 添加到历史记录，使用得分最高的结果
        if (results.length > 0) {
            const bestResult = results[0];
            addToHistory('monoalpha', 'bruteforce', ciphertext, bestResult.text, bestResult.key.toUpperCase());
        }
        
        // 平滑滚动到结果区域
        monoalphaBruteforceResults.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 单字母替换暴力破解算法（增强版）
    function monoalphabeticBruteforce(ciphertext) {
        // 1. 字母频率分析
        const letterFrequency = analyzeLetterFrequency(ciphertext);
        
        // 2. 英语字母频率（已按频率从高到低排序）
        const englishLetterFreqSorted = [
            'e', 't', 'a', 'o', 'i', 'n', 's', 'r', 'h', 'l', 'd', 
            'c', 'u', 'm', 'f', 'p', 'g', 'w', 'y', 'b', 'v', 'k', 
            'x', 'j', 'q', 'z'
        ];
        
        // 3. 英语常见二元组频率 (digraphs)
        const commonDigraphs = [
            'th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd', 
            'ti', 'es', 'or', 'te', 'of', 'ed', 'is', 'it', 'al', 'ar', 
            'st', 'to', 'nt', 'ng', 'se', 'ha', 'as', 'ou', 'io', 'le'
        ];
        
        // 4. 生成多种可能的初始密钥
        let possibleKeys = generatePossibleKeys(letterFrequency, englishLetterFreqSorted);
        
        // 5. 运行一次初始解密和评分
        let results = [];
        
        for (const key of possibleKeys) {
            const decrypted = monoalphabeticDecrypt(ciphertext, key);
            const scoreDetails = getDetailedReliabilityScore(decrypted);
            const score = calculateCombinedScore(decrypted, scoreDetails);
            
            results.push({
                key,
                text: decrypted,
                score,
                detailedScore: scoreDetails
            });
        }
        
        // 对最有希望的前N个密钥使用爬山算法进行优化
        results.sort((a, b) => b.score - a.score);
        const topCandidates = results.slice(0, 5); // 只取前5个最有希望的结果
        
        // 对每个有希望的密钥应用爬山算法
        for (const candidate of topCandidates) {
            const optimizedResult = hillClimbOptimize(ciphertext, candidate.key, commonDigraphs);
            results.push(optimizedResult);
        }
        
        // 再次排序并返回所有结果
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }
    
    // 计算综合评分
    function calculateCombinedScore(text, scoreDetails) {
        // 字母频率分析权重
        const LETTER_FREQ_WEIGHT = 0.3;
        // 常用词频率分析权重
        const WORD_FREQ_WEIGHT = 0.7;
        
        // 如果有常用词，给予额外加分
        let bonus = 0;
        if (scoreDetails.commonWordsFound > 0) {
            bonus = Math.min(10, scoreDetails.commonWordsFound * 2); // 每个常用词加2分，最多10分
        }
        
        const score = Math.round(
            scoreDetails.letterFreqScore * LETTER_FREQ_WEIGHT + 
            scoreDetails.wordFreqScore * WORD_FREQ_WEIGHT + 
            bonus
        );
        
        return Math.min(100, score); // 确保分数不超过100
    }
    
    // 爬山算法优化
    function hillClimbOptimize(ciphertext, initialKey, commonDigraphs) {
        let currentKey = initialKey;
        let bestKey = initialKey;
        let bestScore = 0;
        
        // 获取当前密钥的解密文本和评分
        const initialDecrypted = monoalphabeticDecrypt(ciphertext, currentKey);
        const initialScoreDetails = getDetailedReliabilityScore(initialDecrypted);
        let currentScore = calculateCombinedScore(initialDecrypted, initialScoreDetails);
        bestScore = currentScore;
        
        // 爬山算法迭代次数
        const maxIterations = 100;
        let iterations = 0;
        let noImprovementCount = 0;
        
        while (iterations < maxIterations && noImprovementCount < 15) {
            let improved = false;
            
            // 尝试交换密钥中的两个字符
            for (let i = 0; i < 26 && !improved; i++) {
                for (let j = i + 1; j < 26 && !improved; j++) {
                    // 创建新的密钥，交换两个字符
                    const newKey = swapCharactersInKey(currentKey, i, j);
                    
                    // 解密并评分
                    const decrypted = monoalphabeticDecrypt(ciphertext, newKey);
                    const scoreDetails = getDetailedReliabilityScore(decrypted);
                    const score = calculateCombinedScore(decrypted, scoreDetails);
                    
                    // 如果新的密钥更好，更新当前密钥
                    if (score > currentScore) {
                        currentKey = newKey;
                        currentScore = score;
                        improved = true;
                        
                        // 如果这是迄今为止最好的密钥，保存它
                        if (score > bestScore) {
                            bestKey = newKey;
                            bestScore = score;
                            noImprovementCount = 0;
                        }
                    }
                }
            }
            
            // 如果找不到改进，尝试更加激进的变化
            if (!improved) {
                // 尝试使用常见二元组优化
                const digraphOptimizedKey = optimizeForDigraphs(ciphertext, currentKey, commonDigraphs);
                const digraphDecrypted = monoalphabeticDecrypt(ciphertext, digraphOptimizedKey);
                const digraphScoreDetails = getDetailedReliabilityScore(digraphDecrypted);
                const digraphScore = calculateCombinedScore(digraphDecrypted, digraphScoreDetails);
                
                if (digraphScore > currentScore) {
                    currentKey = digraphOptimizedKey;
                    currentScore = digraphScore;
                    
                    if (digraphScore > bestScore) {
                        bestKey = digraphOptimizedKey;
                        bestScore = digraphScore;
                        noImprovementCount = 0;
                    }
                } else {
                    noImprovementCount++;
                }
            }
            
            iterations++;
        }
        
        // 使用最佳密钥解密
        const finalDecrypted = monoalphabeticDecrypt(ciphertext, bestKey);
        const finalScoreDetails = getDetailedReliabilityScore(finalDecrypted);
        
        return {
            key: bestKey,
            text: finalDecrypted,
            score: bestScore,
            detailedScore: finalScoreDetails,
            iterations: iterations
        };
    }
    
    // 交换密钥中的两个字符
    function swapCharactersInKey(key, i, j) {
        const keyArray = key.split('');
        [keyArray[i], keyArray[j]] = [keyArray[j], keyArray[i]];
        return keyArray.join('');
    }
    
    // 分析二元组并优化密钥
    function optimizeForDigraphs(ciphertext, currentKey, commonDigraphs) {
        // 解密当前文本
        const decrypted = monoalphabeticDecrypt(ciphertext, currentKey);
        
        // 提取解密文本中的二元组
        const digraphs = extractDigraphs(decrypted.toLowerCase());
        
        // 如果没有足够的二元组，则返回原密钥
        if (Object.keys(digraphs).length < 5) {
            return currentKey;
        }
        
        // 将当前密钥转换为映射
        const keyMap = {};
        const plainAlphabet = 'abcdefghijklmnopqrstuvwxyz';
        const cipherAlphabet = currentKey.toLowerCase();
        
        for (let i = 0; i < 26; i++) {
            keyMap[cipherAlphabet[i]] = plainAlphabet[i];
        }
        
        // 尝试改进几个最常见的二元组
        let modifiedKey = currentKey;
        let improvements = 0;
        
        // 按频率排序二元组
        const sortedDigraphs = Object.entries(digraphs)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);  // 只考虑最常见的10个二元组
        
        for (const [digraph, freq] of sortedDigraphs) {
            // 检查该二元组是否是常见英语二元组
            if (!commonDigraphs.includes(digraph) && freq > 0.01) {
                // 找到两个对调可能改进的字符
                for (let i = 0; i < commonDigraphs.length && improvements < 3; i++) {
                    const targetDigraph = commonDigraphs[i];
                    
                    // 如果两个字符不同，尝试一次交换
                    if (digraph[0] !== targetDigraph[0] && digraph[1] !== targetDigraph[1]) {
                        // 找到当前密钥中对应的两个字符
                        const char1 = digraph[0];
                        const char2 = digraph[1];
                        
                        // 找到所需的两个字符
                        const targetChar1 = targetDigraph[0];
                        const targetChar2 = targetDigraph[1];
                        
                        // 获取映射的密文字符
                        let cipherChar1 = null;
                        let cipherChar2 = null;
                        let targetCipherChar1 = null;
                        let targetCipherChar2 = null;
                        
                        // 查找映射
                        for (const [c, p] of Object.entries(keyMap)) {
                            if (p === char1) cipherChar1 = c;
                            if (p === char2) cipherChar2 = c;
                            if (p === targetChar1) targetCipherChar1 = c;
                            if (p === targetChar2) targetCipherChar2 = c;
                        }
                        
                        if (cipherChar1 && targetCipherChar1) {
                            // 在密钥中交换这两个字符
                            const idx1 = cipherAlphabet.indexOf(cipherChar1);
                            const idx2 = cipherAlphabet.indexOf(targetCipherChar1);
                            if (idx1 >= 0 && idx2 >= 0) {
                                modifiedKey = swapCharactersInKey(modifiedKey, idx1, idx2);
                                improvements++;
                            }
                        }
                        
                        // 只有在前一个交换后才考虑第二个交换
                        if (improvements > 0 && cipherChar2 && targetCipherChar2) {
                            const idx1 = cipherAlphabet.indexOf(cipherChar2);
                            const idx2 = cipherAlphabet.indexOf(targetCipherChar2);
                            if (idx1 >= 0 && idx2 >= 0) {
                                modifiedKey = swapCharactersInKey(modifiedKey, idx1, idx2);
                                improvements++;
                            }
                        }
                    }
                }
            }
        }
        
        return modifiedKey;
    }
    
    // 提取文本中的二元组
    function extractDigraphs(text) {
        const digraphCounts = {};
        const lettersOnly = text.replace(/[^a-z]/g, '');
        
        for (let i = 0; i < lettersOnly.length - 1; i++) {
            const digraph = lettersOnly.substring(i, i + 2);
            digraphCounts[digraph] = (digraphCounts[digraph] || 0) + 1;
        }
        
        // 转换为频率
        const totalDigraphs = Object.values(digraphCounts).reduce((sum, count) => sum + count, 0);
        for (const digraph in digraphCounts) {
            digraphCounts[digraph] /= totalDigraphs;
        }
        
        return digraphCounts;
    }
    
    // 分析密文字母频率
    function analyzeLetterFrequency(text) {
        const freqMap = {};
        const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, '');
        
        // 统计每个字母的出现次数
        for (const char of lettersOnly) {
            freqMap[char] = (freqMap[char] || 0) + 1;
        }
        
        // 转换为频率并按频率排序
        const totalChars = lettersOnly.length;
        const freqArray = [];
        
        for (const char in freqMap) {
            freqArray.push({
                char,
                freq: freqMap[char] / totalChars
            });
        }
        
        // 按频率从高到低排序
        freqArray.sort((a, b) => b.freq - a.freq);
        
        return freqArray;
    }
    
    // 生成可能的密钥（增强版）
    function generatePossibleKeys(letterFrequency, englishFreqOrder) {
        const possibleKeys = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        
        // 1. 基于字母频率的密钥
        const frequencyBasedKey = generateKeyFromFrequency(letterFrequency, englishFreqOrder);
        possibleKeys.push(frequencyBasedKey);
        
        // 2. 修改基于频率的密钥，更改一些常见字母对
        // 尝试常见的可能性：e-t, a-o, i-n, s-r等的交换
        const commonPairs = [
            [0, 1], // e-t
            [2, 3], // a-o
            [4, 5], // i-n
            [6, 7], // s-r
            [0, 2], // e-a
            [0, 4], // e-i
            [1, 6]  // t-s
        ];
        
        // 为每一对生成一个变种密钥
        for (const [i, j] of commonPairs) {
            if (i < frequencyBasedKey.length && j < frequencyBasedKey.length) {
                const modifiedKey = [...frequencyBasedKey];
                [modifiedKey[i], modifiedKey[j]] = [modifiedKey[j], modifiedKey[i]];
                possibleKeys.push(modifiedKey.join(''));
            }
        }
        
        // 3. 添加一些部分随机的密钥，保留不同数量的高频字母
        for (let preserveCount = 3; preserveCount <= 7; preserveCount++) {
            const partialRandomKey = generatePartialRandomKey(letterFrequency, englishFreqOrder, preserveCount);
            possibleKeys.push(partialRandomKey);
        }
        
        // 4. 尝试一些完全随机的密钥（增加多样性）
        for (let i = 0; i < 3; i++) {
            const randomKey = generateRandomKey();
            possibleKeys.push(randomKey);
        }
        
        return possibleKeys;
    }
    
    // 根据频率生成密钥
    function generateKeyFromFrequency(letterFrequency, englishFreqOrder) {
        // 创建密钥映射
        const keyMap = {};
        const usedPlainChars = new Set();
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        
        // 将密文字母频率与英语字母频率对应
        for (let i = 0; i < letterFrequency.length; i++) {
            const cipherChar = letterFrequency[i].char;
            // 如果还有可用的英语字母，则映射到对应频率的英语字母
            if (i < englishFreqOrder.length) {
                keyMap[cipherChar] = englishFreqOrder[i];
                usedPlainChars.add(englishFreqOrder[i]);
            }
        }
        
        // 确保所有26个字母都在映射中
        // 为没有在密文中出现的字母分配剩余的明文字母
        const remainingPlainChars = [...alphabet].filter(char => !usedPlainChars.has(char));
        const allCipherChars = [...alphabet].filter(char => !Object.keys(keyMap).includes(char));
        
        for (let i = 0; i < allCipherChars.length && i < remainingPlainChars.length; i++) {
            keyMap[allCipherChars[i]] = remainingPlainChars[i];
        }
        
        // 构建最终密钥字符串
        let key = '';
        for (let i = 0; i < alphabet.length; i++) {
            key += keyMap[alphabet[i]] || alphabet[i];
        }
        
        return key;
    }
    
    // 生成部分随机密钥，保留前几个高频字母
    function generatePartialRandomKey(letterFrequency, englishFreqOrder, preserveCount = 4) {
        // 取前N个高频字母映射
        const keyMap = {};
        const usedPlainChars = new Set();
        const actualPreserveCount = Math.min(preserveCount, letterFrequency.length, englishFreqOrder.length);
        
        for (let i = 0; i < actualPreserveCount; i++) {
            const cipherChar = letterFrequency[i].char;
            keyMap[cipherChar] = englishFreqOrder[i];
            usedPlainChars.add(englishFreqOrder[i]);
        }
        
        // 其余使用随机字母
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const remainingCipherChars = [...alphabet].filter(char => !Object.keys(keyMap).includes(char));
        const remainingPlainChars = [...alphabet].filter(char => !usedPlainChars.has(char));
        
        // 打乱剩余明文字母
        shuffleArray(remainingPlainChars);
        
        for (let i = 0; i < remainingCipherChars.length && i < remainingPlainChars.length; i++) {
            keyMap[remainingCipherChars[i]] = remainingPlainChars[i];
        }
        
        // 构建密钥字符串
        let key = '';
        for (let i = 0; i < alphabet.length; i++) {
            key += keyMap[alphabet[i]] || alphabet[i];
        }
        
        return key;
    }
    
    // 辅助函数：随机打乱数组
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Playfair密码功能
    const playfairInput = document.getElementById('playfair-input');
    const playfairKey = document.getElementById('playfair-key');
    const playfairOutput = document.getElementById('playfair-output');
    const playfairEncryptBtn = document.getElementById('playfair-encrypt');
    const playfairDecryptBtn = document.getElementById('playfair-decrypt');
    const playfairMatrix = document.getElementById('playfair-matrix');
    const playfairPairsDisplay = document.getElementById('playfair-pairs-display');
    const playfairPairs = document.getElementById('playfair-pairs');
    const generatePlayfairKeyBtn = document.getElementById('generate-playfair-key-btn');
    const playfairCopyBtn = document.getElementById('playfair-copy-btn');
    const fillerRadios = document.querySelectorAll('input[name="filler"]');
    
    // 初始化字符计数器和按钮
    setupCharacterCounter('playfair-input', 'playfair-char-count');
    setupCopyButton('playfair-copy-btn', 'playfair-output');
    setupTextAreaActions(document.querySelector('#playfair .input-section'));
    setupSwapButton('playfair-swap', 'playfair-encrypt', 'playfair-decrypt');
    
    // 生成随机Playfair密钥
    function generateRandomPlayfairKey() {
        const words = [
            'SECURITY', 'CRYPTOGRAPHY', 'ENCRYPTION', 'MONARCH', 'QUANTUM', 
            'VICTORY', 'PHOENIX', 'WHISPER', 'ENIGMA', 'PUZZLE'
        ];
        return words[Math.floor(Math.random() * words.length)];
    }
    
    // 生成随机密钥按钮
    generatePlayfairKeyBtn.addEventListener('click', () => {
        const key = generateRandomPlayfairKey();
        playfairKey.value = key;
        updatePlayfairMatrix(key);
    });
    
    // 密钥输入变化时更新矩阵
    playfairKey.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-z]/g, '').toUpperCase();
        updatePlayfairMatrix(this.value);
    });
    
    // 更新Playfair矩阵显示
    function updatePlayfairMatrix(key) {
        const matrix = generatePlayfairMatrix(key);
        displayPlayfairMatrix(matrix, key);
    }
    
    // 生成Playfair矩阵
    function generatePlayfairMatrix(key) {
        // 将I和J视为同一个字母（通常使用I）
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 没有J
        
        // 处理密钥：去重、转大写
        key = key.toUpperCase().replace(/J/g, 'I');
        const uniqueKey = [...new Set(key.split(''))].join('');
        
        // 构建矩阵
        let matrix = uniqueKey;
        
        // 添加剩余字母
        for (const char of alphabet) {
            if (!matrix.includes(char)) {
                matrix += char;
            }
        }
        
        // 转换为二维数组
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(matrix.substring(i * 5, (i + 1) * 5).split(''));
        }
        
        return result;
    }
    
    // 显示Playfair矩阵
    function displayPlayfairMatrix(matrix, key) {
        playfairMatrix.innerHTML = '';
        
        // 以集合形式存储密钥中的字符，用于高亮显示
        const keyChars = new Set(key.toUpperCase().replace(/J/g, 'I').split(''));
        
        // 创建矩阵显示
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.textContent = matrix[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // 如果是密钥中的字母，高亮显示
                if (keyChars.has(matrix[i][j])) {
                    cell.classList.add('keyword');
                }
                
                // 添加交互效果
                cell.addEventListener('mouseenter', function() {
                    // 高亮显示同行和同列的单元格
                    highlightRelatedCells(i, j);
                });
                
                cell.addEventListener('mouseleave', function() {
                    // 移除高亮
                    removeHighlights();
                });
                
                playfairMatrix.appendChild(cell);
            }
        }
        
        // 添加Playfair注释
        if (!document.querySelector('.playfair-note')) {
            const playfairNote = document.createElement('div');
            playfairNote.className = 'playfair-note';
            playfairNote.textContent = translations[document.documentElement.lang]['playfair_note'] || 'Note: In Playfair cipher, I and J are considered as the same letter';
            playfairMatrix.parentNode.appendChild(playfairNote);
        }
    }
    
    // 高亮显示相关单元格
    function highlightRelatedCells(row, col) {
        const cells = playfairMatrix.querySelectorAll('.matrix-cell');
        
        // 高亮同一行的单元格
        for (let j = 0; j < 5; j++) {
            if (j !== col) {
                cells[row * 5 + j].classList.add('highlight');
            }
        }
        
        // 高亮同一列的单元格
        for (let i = 0; i < 5; i++) {
            if (i !== row) {
                cells[i * 5 + col].classList.add('highlight');
            }
        }
    }
    
    // 移除所有高亮
    function removeHighlights() {
        const cells = playfairMatrix.querySelectorAll('.matrix-cell');
        cells.forEach(cell => {
            cell.classList.remove('highlight');
        });
    }
    
    // 预处理Playfair明文
    function preprocessPlayfairText(text, fillerChar) {
        // 去除非字母字符，转为大写，替换J为I
        text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        
        const pairs = [];
        let i = 0;
        
        while (i < text.length) {
            if (i === text.length - 1) {
                // 如果只剩下一个字符，添加填充字符
                pairs.push(text[i] + fillerChar);
                break;
            } else if (text[i] === text[i + 1]) {
                // 如果两个字符相同，添加填充字符
                pairs.push(text[i] + fillerChar);
                i++;
            } else {
                // 否则，添加一对字符
                pairs.push(text[i] + text[i + 1]);
                i += 2;
            }
        }
        
        return pairs;
    }
    
    // 找到字母在矩阵中的位置
    function findPosition(matrix, letter) {
        letter = letter === 'J' ? 'I' : letter;
        
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === letter) {
                    return [i, j];
                }
            }
        }
        
        return null;
    }
    
    // Playfair加密
    function playfairEncrypt(text, matrix, fillerChar) {
        const pairs = preprocessPlayfairText(text, fillerChar);
        const encryptedPairs = [];
        
        for (const pair of pairs) {
            const [row1, col1] = findPosition(matrix, pair[0]);
            const [row2, col2] = findPosition(matrix, pair[1]);
            
            let newPair = '';
            
            if (row1 === row2) {
                // 同一行：取右侧字符(循环到第一列)
                newPair = matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
            } else if (col1 === col2) {
                // 同一列：取下方字符(循环到第一行)
                newPair = matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
            } else {
                // 不同行列：取对角字符
                newPair = matrix[row1][col2] + matrix[row2][col1];
            }
            
            encryptedPairs.push({
                original: pair,
                encrypted: newPair,
                rule: row1 === row2 ? 'same-row' : (col1 === col2 ? 'same-column' : 'rectangle')
            });
        }
        
        return encryptedPairs;
    }
    
    // Playfair解密
    function playfairDecrypt(text, matrix) {
        // 将密文分成对
        const pairs = [];
        for (let i = 0; i < text.length; i += 2) {
            if (i + 1 < text.length) {
                pairs.push(text.substring(i, i + 2));
            }
        }
        
        const decryptedPairs = [];
        
        for (const pair of pairs) {
            const [row1, col1] = findPosition(matrix, pair[0]);
            const [row2, col2] = findPosition(matrix, pair[1]);
            
            let newPair = '';
            
            if (row1 === row2) {
                // 同一行：取左侧字符(循环到最后一列)
                newPair = matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
            } else if (col1 === col2) {
                // 同一列：取上方字符(循环到最后一行)
                newPair = matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
            } else {
                // 不同行列：取对角字符
                newPair = matrix[row1][col2] + matrix[row2][col1];
            }
            
            decryptedPairs.push({
                original: pair,
                decrypted: newPair,
                rule: row1 === row2 ? 'same-row' : (col1 === col2 ? 'same-column' : 'rectangle')
            });
        }
        
        return decryptedPairs;
    }
    
    // 显示字母对
    function displayPairs(pairs, mode) {
        playfairPairs.innerHTML = '';
        
        pairs.forEach(pair => {
            const pairElement = document.createElement('div');
            pairElement.className = 'letter-pair';
            pairElement.setAttribute('data-rule', pair.rule);
            
            if (mode === 'encrypt') {
                pairElement.innerHTML = `${pair.original} <span class="arrow">→</span> ${pair.encrypted}`;
            } else {
                pairElement.innerHTML = `${pair.original} <span class="arrow">→</span> ${pair.decrypted}`;
            }
            
            // 添加交互效果 - 鼠标悬停时显示规则提示
            pairElement.addEventListener('mouseenter', function() {
                let ruleText = '';
                if (pair.rule === 'same-row') {
                    ruleText = translations[document.documentElement.lang]['same_row'] || 'Same Row';
                } else if (pair.rule === 'same-column') {
                    ruleText = translations[document.documentElement.lang]['same_column'] || 'Same Column';
                } else {
                    ruleText = translations[document.documentElement.lang]['rectangle'] || 'Rectangle';
                }
                
                this.setAttribute('title', ruleText);
            });
            
            playfairPairs.appendChild(pairElement);
        });
        
        // 添加规则图例
        const ruleLegend = document.createElement('div');
        ruleLegend.className = 'playfair-rule-legend';
        ruleLegend.innerHTML = `
            <div class="rule-item">
                <div class="rule-color same-row"></div>
                <span>${translations[document.documentElement.lang]['same_row'] || 'Same Row'}</span>
            </div>
            <div class="rule-item">
                <div class="rule-color same-column"></div>
                <span>${translations[document.documentElement.lang]['same_column'] || 'Same Column'}</span>
            </div>
            <div class="rule-item">
                <div class="rule-color rectangle"></div>
                <span>${translations[document.documentElement.lang]['rectangle'] || 'Rectangle'}</span>
            </div>
        `;
        
        playfairPairs.appendChild(ruleLegend);
        playfairPairsDisplay.classList.add('show');
    }
    
    // 获取选中的填充字符
    function getSelectedFillerChar() {
        for (const radio of fillerRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'X'; // 默认使用X
    }
    
    // 加密按钮
    playfairEncryptBtn.addEventListener('click', () => {
        const text = playfairInput.value.trim();
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_encrypt_text']);
            return;
        }
        
        const key = playfairKey.value.trim();
        if (!key) {
            alert(translations[document.documentElement.lang]['enter_playfair_key']);
            return;
        }
        
        const fillerChar = getSelectedFillerChar();
        const matrix = generatePlayfairMatrix(key);
        const encryptedPairs = playfairEncrypt(text, matrix, fillerChar);
        
        // 组合加密结果
        const encrypted = encryptedPairs.map(pair => pair.encrypted).join('');
        
        playfairOutput.textContent = encrypted;
        playfairOutput.classList.add('highlight');
        setTimeout(() => {
            playfairOutput.classList.remove('highlight');
        }, 1000);
        
        // 显示字母对
        displayPairs(encryptedPairs, 'encrypt');
        
        // 添加到历史记录
        addToHistory('playfair', 'encrypt', text, encrypted, key);
    });
    
    // 解密按钮
    playfairDecryptBtn.addEventListener('click', () => {
        const text = playfairInput.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
        if (!text) {
            alert(translations[document.documentElement.lang]['enter_decrypt_text']);
            return;
        }
        
        const key = playfairKey.value.trim();
        if (!key) {
            alert(translations[document.documentElement.lang]['enter_playfair_key']);
            return;
        }
        
        // 验证密文长度是否为偶数
        if (text.length % 2 !== 0) {
            alert('Ciphertext length must be even for Playfair cipher');
            return;
        }
        
        const matrix = generatePlayfairMatrix(key);
        const decryptedPairs = playfairDecrypt(text, matrix);
        
        // 组合解密结果
        let decrypted = decryptedPairs.map(pair => pair.decrypted).join('');
        
        // 移除填充字符（X或Z）
        const fillerChar = getSelectedFillerChar();
        const otherFiller = fillerChar === 'X' ? 'Z' : 'X';
        
        // 首先尝试移除选择的填充字符
        decrypted = removeFillers(decrypted, fillerChar);
        
        // 然后尝试移除另一个可能的填充字符
        decrypted = removeFillers(decrypted, otherFiller);
        
        playfairOutput.textContent = decrypted;
        playfairOutput.classList.add('highlight');
        setTimeout(() => {
            playfairOutput.classList.remove('highlight');
        }, 1000);
        
        // 显示字母对
        displayPairs(decryptedPairs, 'decrypt');
        
        // 添加到历史记录
        addToHistory('playfair', 'decrypt', text, decrypted, key);
    });
    
    // 移除填充字符
    function removeFillers(text, fillerChar) {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            // 如果是填充字符，且满足以下条件之一，则跳过：
            // 1. 它后面跟着一个相同的字符
            // 2. 它是文本的最后一个字符
            // 3. 它前面有一个字符，而后面是相同的字符
            if (text[i] === fillerChar) {
                if (i + 1 === text.length || 
                    (i > 0 && text[i - 1] === text[i + 1]) || 
                    text[i - 1] === text[i + 1]) {
                    continue;
                }
            }
            result += text[i];
        }
        
        return result;
    }
    
    // 初始化Playfair矩阵
    document.addEventListener('DOMContentLoaded', function() {
        const key = generateRandomPlayfairKey();
        playfairKey.value = key;
        updatePlayfairMatrix(key);
    });
}); 
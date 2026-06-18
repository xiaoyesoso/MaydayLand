import React, { useState, useCallback } from 'react';
import { View, Text, Input, Textarea, Button, Picker } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { buildDiscoverShare } from '@/utils/share';
import { addPendingCorner } from '@/utils/storage';
import styles from './index.module.scss';

const categories = [
  { key: 'cafe', label: '咖啡馆' },
  { key: 'bookstore', label: '书店' },
  { key: 'record', label: '唱片店' },
  { key: 'graffiti', label: '涂鸦墙' },
  { key: 'venue', label: '演唱会场馆' },
  { key: 'other', label: '其他' }
];

const lyricTags = ['温柔', '倔强', '知足', '拥抱', '干杯', '任意门', '如烟', '星空'];

const SubmitPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [lyric, setLyric] = useState('');
  const [song, setSong] = useState('');
  const [passcode, setPasscode] = useState('');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recommend, setRecommend] = useState('');

  useShareAppMessage(() => buildDiscoverShare());

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !city.trim() || !lyric.trim() || !song.trim()) {
      Taro.showToast({ title: '请填写必填项', icon: 'none' });
      return;
    }

    const category = categories[categoryIndex].key;
    const payload = {
      id: `pending_${Date.now()}`,
      name: name.trim(),
      city: city.trim(),
      address: address.trim(),
      lyric: lyric.trim(),
      song: song.trim(),
      passcode: passcode.trim() || song.trim(),
      category,
      moodTags: selectedTags,
      recommend: recommend.trim(),
      createdAt: new Date().toISOString().slice(0, 10)
    };

    console.log('[Submit] submit corner', payload);
    addPendingCorner(payload);
    setSubmitted(true);
  }, [name, city, address, lyric, song, passcode, categoryIndex, selectedTags, recommend]);

  if (submitted) {
    return (
      <View className={styles.success}>
        <View className={styles.successIcon}>✓</View>
        <View className={styles.successTitle}>感谢推荐！</View>
        <View className={styles.successSub}>你的角落正在审核中，通过后会出现在歌词地图上</View>
        <Button className={styles.backBtn} onClick={() => Taro.navigateBack()}>
          返回
        </Button>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.title}>推荐一个角落</View>
        <View className={styles.subtitle}>让下一位五迷，在这里遇见你听过的歌</View>
      </View>

      <View className={styles.form}>
        <View className={styles.field}>
          <Text className={styles.label}>角落名称<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.input}
            placeholder='例如：永康路温柔的猫咖啡'
            placeholderClass={styles.placeholder}
            value={name}
            onInput={(e) => setName(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>城市<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.input}
            placeholder='例如：上海'
            placeholderClass={styles.placeholder}
            value={city}
            onInput={(e) => setCity(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>详细地址</Text>
          <Input
            className={styles.input}
            placeholder='例如：徐汇区永康路 123 号'
            placeholderClass={styles.placeholder}
            value={address}
            onInput={(e) => setAddress(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>类型</Text>
          <Picker
            mode='selector'
            range={categories.map((c) => c.label)}
            value={categoryIndex}
            onChange={(e) => setCategoryIndex(e.detail.value as number)}
          >
            <View className={styles.picker}>
              <Text>{categories[categoryIndex].label}</Text>
              <Text className={styles.pickerArrow}>▼</Text>
            </View>
          </Picker>
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>那句歌词<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.input}
            placeholder='例如：天空和我的中间，只剩倾盆的思念'
            placeholderClass={styles.placeholder}
            value={lyric}
            onInput={(e) => setLyric(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>来自哪首歌<Text className={styles.required}>*</Text></Text>
          <Input
            className={styles.input}
            placeholder='例如：步步'
            placeholderClass={styles.placeholder}
            value={song}
            onInput={(e) => setSong(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>到店暗号</Text>
          <Input
            className={styles.input}
            placeholder='例如：说好不哭'
            placeholderClass={styles.placeholder}
            value={passcode}
            onInput={(e) => setPasscode(e.detail.value)}
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>情绪标签</Text>
          <View className={styles.tagRow}>
            {lyricTags.map((tag) => (
              <View
                key={tag}
                className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </View>
            ))}
          </View>
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>推荐理由</Text>
          <Textarea
            className={styles.textarea}
            placeholder='说说这里和五月天的故事...'
            placeholderClass={styles.placeholder}
            value={recommend}
            onInput={(e) => setRecommend(e.detail.value)}
            maxlength={200}
          />
        </View>
      </View>

      <View className={styles.tip}>
        提示：推荐内容需审核后展示，请勿填写敏感信息或侵犯他人权益的内容。
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.submitBtn} onClick={handleSubmit}>
          提交审核
        </Button>
      </View>
    </View>
  );
};

export default SubmitPage;

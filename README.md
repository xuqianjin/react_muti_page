## react_muti_page
- react+webpack+es6 �����ҳ��
- ����ļ������� Ĭ��ͬĿ¼ dist
#### USAGE
```
git clone           #��¡��Ŀ
cd react_muti_page  #������Ŀ	
npm install         #��װ
```
#### ����
```
npm run dev         #��localhost:222����dist
npm compile         #���
npm compile_qiniu   #����ţ���Ӵ��
```
#### Ŀ¼�ṹ
```
- website
    - src                #���뿪��Ŀ¼
		+ components     #���Ŀ¼
        + static         #ͼƬ�Ⱦ�̬��Դ
		+ http           #��������Ŀ¼
        - view           #HTMLģ��
			- page1      #ҳ��1
				+template.html
				+index.js
			- page2      #ҳ��2
				+template.html
				+index.js
    - dist               #webpack���������Ŀ¼�����轨��Ŀ¼����webpack���������Զ�����
        + css                
        + js
        + [html]
    + node_modules       #��ʹ�õ�nodejsģ��
    package.json         #��Ŀ����
    webpack.config.js    #webpack����
    README.md            #��Ŀ˵��
```
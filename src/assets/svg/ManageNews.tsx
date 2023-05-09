import React, { FC } from 'react';

interface ManageNewsProps {
    className: string
}

const ManageNews:FC<ManageNewsProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className={className}>
            <g>
                <path d="M447.038 70.508H423.27c-1.633-4.217-5.721-7.221-10.508-7.221-4.577 0-6.382-3.5-6.827-4.573s-1.643-4.825 1.593-8.06a11.202 11.202 0 0 0 3.302-7.973c0-3.011-1.172-5.842-3.302-7.973l-9.202-9.202c-4.396-4.395-11.548-4.396-15.945 0-3.236 3.237-6.987 2.039-8.06 1.594-1.073-.444-4.573-2.25-4.573-6.827 0-6.216-5.058-11.274-11.274-11.274h-13.013c-6.216 0-11.273 5.058-11.273 11.274 0 4.577-3.5 6.383-4.573 6.827-1.072.444-4.824 1.642-8.062-1.596-4.396-4.393-11.548-4.393-15.943.001l-9.203 9.203a11.207 11.207 0 0 0-3.301 7.972 11.2 11.2 0 0 0 3.302 7.972c3.236 3.236 2.038 6.988 1.594 8.061s-2.25 4.573-6.827 4.573c-4.787 0-8.875 3.003-10.508 7.221H73.102c-20.768 0-37.663 16.896-37.663 37.663v245.181c0 20.768 16.896 37.663 37.663 37.663h120.547c-.355 23.236-5.941 46.62-12.21 60.655h-25.275c-14.151 0-25.665 11.513-25.665 25.665S142.013 503 156.164 503h199.672c14.152 0 25.665-11.513 25.665-25.665s-11.513-25.665-25.665-25.665H330.49c-6.565-14.279-12.512-37.743-13.079-60.655h121.488c20.768 0 37.664-16.896 37.664-37.663V100.037c-.001-16.283-13.246-29.529-29.525-29.529zm-153.137 6.615c7.627-.931 14.013-5.753 17.035-13.051 3.023-7.297 1.918-15.222-2.817-21.274l5.58-5.58c6.051 4.735 13.976 5.84 21.274 2.818 7.297-3.023 12.121-9.408 13.051-17.036h7.89c.931 7.627 5.754 14.013 13.051 17.036s15.223 1.917 21.274-2.818l5.58 5.58c-4.735 6.052-5.84 13.977-2.817 21.274 3.022 7.297 9.407 12.12 17.035 13.051v7.89c-7.627.931-14.012 5.753-17.035 13.051-3.023 7.297-1.918 15.223 2.817 21.274l-5.58 5.58c-6.051-4.735-13.976-5.839-21.274-2.818-7.297 3.023-12.12 9.408-13.051 17.035h-7.889c-.93-7.635-5.751-14.023-13.047-17.045-7.297-3.023-15.225-1.914-21.279 2.828l-5.58-5.58c4.735-6.052 5.84-13.977 2.817-21.274-3.022-7.297-9.408-12.12-17.035-13.051zM73.102 84.508h206.799v3.066c0 6.216 5.058 11.274 11.274 11.274 4.577 0 6.382 3.5 6.827 4.573s1.643 4.825-1.594 8.061c-4.396 4.396-4.396 11.548 0 15.944l9.202 9.202c4.396 4.396 11.547 4.396 15.944 0 3.245-3.244 6.994-2.048 8.065-1.604 1.072.444 4.569 2.249 4.569 6.837 0 6.216 5.057 11.274 11.273 11.274h13.013c6.216 0 11.274-5.058 11.274-11.274 0-4.577 3.5-6.382 4.573-6.827 1.073-.444 4.825-1.643 8.062 1.595 4.397 4.396 11.549 4.395 15.944-.001l9.202-9.202c4.396-4.396 4.396-11.548 0-15.944-3.236-3.236-2.038-6.988-1.594-8.061s2.25-4.573 6.827-4.573c6.216 0 11.274-5.058 11.274-11.274v-3.066h23.001c8.56 0 15.524 6.966 15.524 15.529v215.986H49.438V108.171c0-13.048 10.616-23.663 23.664-23.663zm294.399 392.827c0 6.432-5.233 11.665-11.665 11.665H156.164c-6.432 0-11.665-5.233-11.665-11.665s5.233-11.665 11.665-11.665h199.672c6.432 0 11.665 5.233 11.665 11.665zm-52.243-25.665H196.596c6.543-17.131 10.737-39.91 11.051-60.655h95.763c.487 20.501 4.982 43.294 11.848 60.655zm123.64-74.655H73.102c-13.048 0-23.663-10.615-23.663-23.663v-23.33h413.123v23.33c0 13.048-10.616 23.663-23.664 23.663zm-159.04-23.496a7 7 0 0 1-7 7h-33.716a7 7 0 1 1 0-14h33.716a7 7 0 0 1 7 7zm72.111-234.188c21.099 0 38.264-17.165 38.264-38.263 0-21.099-17.165-38.264-38.264-38.264s-38.263 17.165-38.263 38.264c0 21.098 17.164 38.263 38.263 38.263zm0-62.527c13.379 0 24.264 10.885 24.264 24.264s-10.885 24.263-24.264 24.263-24.263-10.884-24.263-24.263 10.884-24.264 24.263-24.264zM96.454 221.663c5.108 0 9.328 2.825 11.288 7.557s.974 9.714-2.637 13.326a12.626 12.626 0 0 0-3.723 8.987c0 3.395 1.322 6.586 3.722 8.986l12.29 12.29c4.955 4.955 13.018 4.955 17.973 0 3.62-3.619 8.604-4.61 13.331-2.651 4.729 1.958 7.552 6.183 7.552 11.301 0 7.007 5.701 12.708 12.708 12.708h17.379c7.007 0 12.708-5.701 12.708-12.708 0-5.108 2.825-9.328 7.557-11.288 4.732-1.959 9.714-.974 13.325 2.637 2.4 2.4 5.591 3.723 8.987 3.723 3.395 0 6.586-1.322 8.986-3.722l12.289-12.29c2.4-2.4 3.723-5.591 3.723-8.986 0-3.396-1.322-6.587-3.722-8.986-3.612-3.612-4.598-8.594-2.638-13.326s6.18-7.557 11.288-7.557c7.007 0 12.708-5.701 12.708-12.708v-17.379c0-7.007-5.701-12.708-12.708-12.708-5.108 0-9.328-2.825-11.288-7.557s-.974-9.714 2.638-13.326c4.955-4.955 4.955-13.017 0-17.973l-12.29-12.29c-4.955-4.954-13.018-4.954-17.972 0-3.612 3.611-8.592 4.598-13.326 2.638-4.731-1.96-7.557-6.18-7.557-11.287 0-7.007-5.701-12.708-12.708-12.708h-17.379c-7.007 0-12.708 5.701-12.708 12.708 0 5.107-2.825 9.327-7.557 11.287s-9.714.975-13.327-2.638c-4.955-4.953-13.017-4.954-17.972 0l-12.29 12.29c-4.955 4.956-4.954 13.018 0 17.973 3.612 3.612 4.598 8.593 2.638 13.325s-6.18 7.558-11.288 7.558c-7.007 0-12.708 5.701-12.708 12.708v17.379c0 7.006 5.701 12.707 12.708 12.707zm1.292-28.826c10.246-.474 18.958-6.579 22.93-16.17 3.973-9.592 2.129-20.068-4.78-27.648l10.505-10.506c7.58 6.91 18.057 8.753 27.649 4.781 9.591-3.973 15.695-12.685 16.169-22.93h14.856c.474 10.246 6.578 18.957 16.169 22.93 9.591 3.972 20.068 2.129 27.649-4.781l10.505 10.506c-6.91 7.58-8.753 18.056-4.78 27.648s12.684 15.696 22.93 16.17v14.855c-10.246.474-18.957 6.578-22.93 16.169-3.973 9.592-2.13 20.068 4.78 27.649l-10.505 10.506c-7.58-6.91-18.057-8.754-27.648-4.78-9.592 3.973-15.696 12.684-16.17 22.93H170.22c-.473-10.256-6.576-18.972-16.165-22.944-9.588-3.972-20.067-2.124-27.654 4.794l-10.505-10.506c6.91-7.58 8.753-18.057 4.78-27.649-3.973-9.591-12.684-15.695-22.93-16.169zm79.902 56.182c26.883 0 48.754-21.871 48.754-48.754s-21.871-48.754-48.754-48.754-48.754 21.871-48.754 48.754 21.871 48.754 48.754 48.754zm0-83.508c19.164 0 34.754 15.59 34.754 34.754s-15.59 34.754-34.754 34.754-34.754-15.59-34.754-34.754 15.59-34.754 34.754-34.754zm116.333 121.655a7 7 0 0 1 7-7h66.074a7 7 0 1 1 0 14h-66.074a7 7 0 0 1-7-7zm0-86.901a7 7 0 0 1 7-7H433.13a7 7 0 1 1 0 14H300.981a7 7 0 0 1-7-7zm0 43.45a7 7 0 0 1 7-7H433.13a7 7 0 1 1 0 14H300.981a7 7 0 0 1-7-7z" fill="#000000" data-original="#000000" className={className}></path>
            </g>
        </svg>
    );
};

export default ManageNews;
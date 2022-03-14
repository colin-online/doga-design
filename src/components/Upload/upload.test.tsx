import '@testing-library/jest-dom/extend-expect';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { Upload, UploadProps } from './upload';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

/* 测试上传组件 */
describe('test upload component', () => {
  /* 上传过程应该可以正常工作 */
  it('upload process should works fine', async () => {
    render(<Upload {...testProps}>Click to upload</Upload>).container.append('.doga-file-input');
    let uploadArea = screen.getByText('Click to upload');
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    expect(uploadArea).toBeInTheDocument();
  });

  /* 拖放文件应该可以正常工作 */
  it('drag and drop files should works fine', async () => {
    render(<Upload {...testProps}>Click to upload</Upload>).container.append('.doga-file-input');
    let uploadArea = screen.getByText('Click to upload');
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    });
  });
});
